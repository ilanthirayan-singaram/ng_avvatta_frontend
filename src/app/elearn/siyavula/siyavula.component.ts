import { Component, HostListener, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivityResult, Chapter, Topic } from '../models';
import { ServiceService } from '../service.service';
import { CommonService } from './../../common.service';


declare var MathJax: any;

@Component({
  selector: 'app-siyavula',
  templateUrl: './siyavula.component.html',
  styleUrls: ['./siyavula.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class SiyavulaComponent implements OnInit {
  paddingHeight : string;
  clickId: number;
  sideList: boolean = false;
  popupPosition: number = 0;
  screen: number = 1;
  topics: Topic[];
  selectedChapter: Chapter;
  state = {
    activityId: null,
    responseId: null,
    sequenceId: null
  };
  questionHtml: any;
  topicInterval: any;
  activityResponse: ActivityResult;


  constructor(
   
    private service: ServiceService,
    private sanitizer: DomSanitizer,
    private common : CommonService
  ) {

  }

  ngOnInit(): void {
    this.paddingHeight = parseInt(localStorage.getItem('height')) + 'px';
    this.common.loaderOnLoad();
    this.service.verifyLogin();
    this.slideShow();
  }

  slideShow(): void {
    this.clickId = 1;
  }

  ngDoCheck(){
    this.paddingHeight = parseInt(localStorage.getItem('height')) + 'px';
  }

  topicMouseOver(chapter: Chapter, $event): void {
    // // console.log(chapter);
    clearInterval(this.topicInterval);
    this.popupPosition = $event.currentTarget.offsetTop + 20 - chapter.sections.length * 40 / 2;
    this.selectedChapter = chapter;
    this.sideList = true;
  }

  topicMouseOut(chapter: Chapter): void {
    this.topicInterval = setTimeout(() => {
      this.sideList = false;
    }, 2000);
  }

  sectionMouseOver(): void {
    clearInterval(this.topicInterval);
  }

  sectionMouseOut(): void {
    this.topicInterval = setTimeout(() => {
      this.sideList = false;
    }, 2000);
  }

  @HostListener('document:submit', ['$event']) async onSubmit($event) {
    $event.preventDefault();
    const formData = new FormData($event.target);
    const params = [...formData as any].reduce((prev, cur) => { prev[cur[0]] = cur[1]; return prev; }, {});
    const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

    const activityId = this.state.activityId;
    const responseId = this.state.responseId;
    await this.service.verifyLogin();
    const response = await this.service.submitUnsequencedAnswer<ActivityResult>(activityId, responseId, queryString).toPromise();
    this.process(response);
  }

  @HostListener('document:click', ['$event']) async onRetryOrNext($event) {

    if (($event.target as Element).classList.contains('sv-button--retry-question')) {
      $event.preventDefault();
      const retryUrl = this.activityResponse.activity.retry_url;
      if (retryUrl) {
        await this.service.verifyLogin();
        const response = await this.service.retryOrNextQuestion<ActivityResult>(retryUrl, {}).toPromise();
        this.process(response);
      }
    } else if (($event.target as Element).classList.contains('sv-button--goto-question')) {
      $event.preventDefault();
      const next_url = this.activityResponse.activity.next_url;
      if (next_url) {
        await this.service.verifyLogin();
        const response = await this.service.retryOrNextQuestion<ActivityResult>(next_url, {}).toPromise();
        this.process(response);
      }
    }
  }

  async showMathsTopics(event, level: number): Promise<void> {
    this.screen = 2;

    const grade = this.getLevel(level);
    await this.service.verifyLogin();
    this.topics = await this.service.getTopicsByLevel<Topic[]>(level).toPromise();
    this.topics = [this.topics.find(x => x.grade === grade)];
  }

  async createPractice(sectionId: number): Promise<void> {
    
    let check = false;
    if (localStorage.getItem("log") === null) {
      this.common.loginModal();
    }
    else {
      let subscriptionId;
        subscriptionId = 48;
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // // console.log(checkData);
      let today = new Date();

      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      if(date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13'){
        check = true;
        this.sideList = false;
        await this.service.verifyLogin();
        const response = await this.service.createPracticeActivity<ActivityResult>(sectionId).toPromise();
        this.process(response);
      }
      else{
      this.common.checkSubscription(checkData).subscribe(async data =>{
        // console.log(data, JSON.parse(JSON.stringify(data)).success);
        if(JSON.parse(JSON.stringify(data)).success != true){
          check = true;
          this.sideList = false;
          await this.service.verifyLogin();
          const response = await this.service.createPracticeActivity<ActivityResult>(sectionId).toPromise();
          this.process(response);
          this.common.userActivity('education', 'siy', response.practice.chapter.id,  'siy','interact', '0', '').subscribe(data =>{
            console.log('data', data);
          });
        }
        else{
          this.common.subscribeModal(subscriptionId);
          
        }
      });
    }

  }
    // this.sideList = false;
    // await this.service.verifyLogin();
    // const response = await this.service.createPracticeActivity<ActivityResult>(sectionId).toPromise();
    // this.process(response);
  }

  private process(response: ActivityResult): void {
    // console.log(response);
    const activityId = response.activity.id;
    const responseId = response.response.id;
    const sequenceId = response.activity.sequence_id;
    this.setState(activityId, responseId, sequenceId);

    this.setQuestionContent(response.response.question_html);
    setTimeout(() => {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }, 1);

    this.activityResponse = response;
    this.updateMastery(response);
  }

  setQuestionContent(html): void {
    this.questionHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    this.screen = 3;
  }

  updateMastery(response: ActivityResult): void {
    if (response && response.practice && response.practice.chapter && response.practice.section) {
      const chapterId = response.practice.chapter.id;
      const chapterMastery = response.practice.chapter.mastery;
      const sectionId = response.practice.section.id;
      const sectionMastery = response.practice.section.mastery;

      const topic = this.topics.find(x => x.chapters.some(c => c.id === chapterId));
      if (topic) {
        const chapter = topic.chapters.find(x => x.id === chapterId);
        chapter.mastery = chapterMastery;
        const section = chapter.sections.find(x => x.id === sectionId);
        if (section) {
          section.mastery = sectionMastery;
        }
      }
    }
  }

  private getLevel(level: number): number {
    const ngGrades = [7, 8, 9, 10, 11, 12];
    return ngGrades[level];
  }

  private setState(activityId: any, responseId: any, sequenceId: any): void {
    if (activityId === 0) {
      activityId = null;
    }

    if (responseId === 0) {
      responseId = null;
    }

    if (sequenceId === 0) {
      sequenceId = null;
    }

    this.state = {
      activityId,
      responseId,
      sequenceId
    };
  }

  onback($event): void {
    this.screen--;
  }
}
