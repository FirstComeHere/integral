import { Component, OnInit } from '@angular/core';
import { InterceptorService } from '../../../providers/interceptor.service';
import { ToastController, NavController } from '@ionic/angular';
import { BaseUI } from '../../../common/baseui';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-department',
  templateUrl: './all-department.page.html',
  styleUrls: ['./all-department.page.scss'],
})
export class AllDepartmentPage extends BaseUI implements OnInit {


  /*-------------------------------变量声明区-----------------------------------------------------*/
  //  查询所有部门
  Department = [];
  // 层级部门结构变量接收器
  oneDepartInfo = {
    children: [],
    name: '',
    id: '',
    pid: ''
  };

  twoDepartInfo = {
    children: [],
    name: '',
    id: '',
    pid: ''
  };
  oneDepartment = [];
  twoDepartment = [];
  thirdDepartment = [];

  isShowOne: boolean = true;
  isShowAll = [
    'hide',
    'hide',
    'hide',
    'hide',
    'hide',
    'hide',
    'hide',
    'hide',
    'hide',
    'hide'
  ];

  // 部门分组数据
  sortData: Array<any>;
  /*-------------------------------变量声明区-----------------------------------------------------*/


  constructor(
    public http: InterceptorService,
    public toastCtrl: ToastController,
    public router: Router,
    public nav: NavController
  ) {
    super();
  }

  canGoBack() {
    this.nav.goBack();
  }

  ngOnInit() {
    this.selectDepartment();
  }

  /*-------------------------------方法区-----------------------------------------------------*/


  /**
   * 查询所有固定部门
   * @author 张明慧
   * @since 2019年1月10日09:08:50
   */
  selectDepartment() {
    // const dataUrl = 'auth-web/organization/queryOrganizationById/23VAJAVAXT492QKFsfUBru';
    const dataUrl = 'auth-web/organization/queryOrganizationTree?companyId=' + localStorage.getItem('companyId');

    this.http.get(dataUrl).subscribe(
      res => {
        this.Department = res.json();
        if (this.Department.length > 0) {
          this.oneDepartInfo.children = this.Department[0].children;
          this.oneDepartInfo.name = this.Department[0].name;
          this.oneDepartInfo.id = this.Department[0].id;
          this.oneDepartInfo.pid = this.Department[0].pid;

        } else {
          super.showToast(this.toastCtrl, '抱歉出错啦，请反馈给积分项目组吧！');
        }

        // 按照部门名字排序
        // this.sortData = this.Department.sort(this.compare('organizationName'));
      }
    );
  }


  /**
   * 按照部门名字排序
   * @author 张明慧
   * @since 2019年1月10日09:15:10
   */
  compare(pro) {
    return function (obj1, obj2) {
      let val1 = obj1[pro];
      let val2 = obj2[pro];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 > val2) {
        return 1;
      } else if (val1 < val2) {
        return -1;
      } else {
        return 0;
      }
    };
  }

  /**
   * 跳转至部门详情界面
   * @author 张明慧
   * @since 2019年1月10日09:30:51
   */
  gotoDepartPeo(uId: any, uName: any) {
    this.router.navigate(['../../department-people'],
      {
        queryParams: {
          departmentId: uId.innerText,
          departmentName: uName.innerText
        }
      });
  }

  /**
   * 判断是否有子级结构
   * @param isShow
   * @author 冯浩月
   * @since 2019年3月1日16:45:37
   */
  isShow(isShowOne: boolean) {
    this.isShowOne = isShowOne;
  }

  /**
   * 是否显示子级结构
   * @param isShow
   * @author 冯浩月
   * @since 2019年3月1日16:45:37
   */
  isShowI(i: any, isShow: any) {
    switch (i) {
      case 0:
        this.isShowAll[0] = isShow;
        break;
      case 1:
        this.isShowAll[1] = isShow;
        break;
      case 2:
        this.isShowAll[2] = isShow;
        break;
      case 3:
        this.isShowAll[3] = isShow;
        break;
      case 4:
        this.isShowAll[4] = isShow;
        break;
      case 5:
        this.isShowAll[5] = isShow;
        break;
      case 6:
        this.isShowAll[6] = isShow;
        break;
      case 7:
        this.isShowAll[7] = isShow;
        break;
      case 8:
        this.isShowAll[8] = isShow;
        break;
      case 9:
        this.isShowAll[9] = isShow;
        break;

    }
  }
  /*-------------------------------方法区-----------------------------------------------------*/
}
