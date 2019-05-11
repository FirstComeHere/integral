import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-auto-play',
  templateUrl: './auto-play.page.html',
  styleUrls: ['./auto-play.page.scss'],
})
export class HomeMainPage implements OnInit {

  // 判断用户是否已经登录
  public logined = false;

  // 抽奖变量
  chanceNumber: String = '1';
  chanceName: String = ' 次抽奖机会';
  isChoujiang: Boolean = true;

  @ViewChild(IonSlides) slides: IonSlides;
  constructor(
    public router: Router,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.loadUserPage();
  }

  // 下拉刷新页面
  doRefresh(event: any) {
    this.ngOnInit();
    this.slides.stopAutoplay();
    this.slides.startAutoplay();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  // 界面重新进入时，加载页面
  ionViewWillEnter() {
    this.ngOnInit();
    this.slides.startAutoplay();
  }
  // 退出界面时，轮播图停止
  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  /**
* 如果用户已登录，直接显示me页面，如果用户未登录，直接显示登录页面
* @author 杨晓风
* @since 2018-12-18 16:55:44
*/
  loadUserPage() {
    this.storage.get('Authorization').then((val) => {
      if (val != null) {
        this.logined = true;
        this.router.navigateByUrl('tabs/home');
      } else {
        this.logined = false;
        this.router.navigateByUrl('login');
      }
    });
  }

  checkbatch() {
    this.router.navigateByUrl('tabs/home/check-batch');
  } 
  publicprogram() {
    this.router.navigateByUrl('tabs/home/public-project');
  }
  selectsutdent() {
    this.router.navigateByUrl('tabs/home/search-student');
  }
  addstudent() {
    this.router.navigateByUrl('tabs/home/add-student');
  }
  addgroup() {
    this.router.navigateByUrl('tabs/home/add-group');
  }
  starttest() {
    this.router.navigateByUrl('tabs/home/start-test');
  }
  student() {
    this.router.navigateByUrl('tabs/home/student-main');
  }
  checkgroup() {
    this.router.navigateByUrl('tabs/home/select-group');
  }

  /**
  * 跳转到抽奖界面
  * @author: 冯浩月
  * @since: 2019年1月23日08:21:06
  * @return:
  */
  goToLotteryPage() {
    this.router.navigateByUrl('lottery');
  }


}
