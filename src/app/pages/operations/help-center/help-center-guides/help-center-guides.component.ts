import { Component, OnInit } from '@angular/core';
import { trackById } from '@vex/utils/track-by';
import { MatDialog } from '@angular/material/dialog';
import { HelpCenterGuidesGuideComponent } from './help-center-guides-guide/help-center-guides-guide.component';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';

export enum GuideCategory {
  firstSteps,
  accountSettings,
  apiHelp,
  billing
}

export interface Guide {
  id: number;
  label: string;
  icon: string;
  category: GuideCategory;
  content: string| null;
  onClick: (guide: Guide) => void;
}

@Component({
  selector: 'vex-help-center-guides',
  templateUrl: './help-center-guides.component.html',
  styleUrls: ['./help-center-guides.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, MatIconModule]
})
export class HelpCenterGuidesComponent implements OnInit {
  guides: Guide[] = [
    {
      id: 1,
      label: 'Vendor dashboard',
      icon: 'mat:description',
      category: GuideCategory.accountSettings,
      content: `
      <div>
          <div style="text-align:center"><div><h2>Explain Supplier Dashboard</h2></div></div>
          
      <div style="position:relative;padding-bottom:56.25%;">
          <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px" 
      src="https://embed.app.guidde.com/playbooks/jxVxcvvHZWA8Zua8VweSer"
      title="Explain Supplier Dashboard"
      frameborder="0"
      referrerpolicy="unsafe-url"
      allowfullscreen="true"
      allow="clipboard-write"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-same-origin allow-presentation"></iframe>
      </div>
          
          <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Welcome to the Supplier Dashboard guide! This guide will walk you through the various features and functionalities of the Supplier Dashboard application, helping you navigate through the different sections and perform specific actions. Follow the instructions below to make the most out of the Supplier Dashboard.</p>
            
        </div> <h3 style="width: 100%; word-break: break-word; max-width:100%;">
                      Go to <a href="http://localhost:4200" target="_blank">localhost:4200</a>
                  </h3> <h3 style="width: 100%; word-break: break-word; max-width:100%;">1. Click "Hello, MDD! You have 1 requests to quote  You have quoted all requests  You have 4 unpaid purchase orders"</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;"> "Hello, supplier! here You have the information about 
how many requests you quote.
and how many unpaid PO.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F7m7PLkdCQ41aZHnWCjBJVh_doc.png?alt=media&amp;token=fb416787-53ff-4403-b1fe-facef6946162" alt="Click 'Hello, MDD! You have 1 requests to quote  You have quoted all requests  You have 4 unpaid purchase orders'" /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">2. Here is mentioned how many requests to quote.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is mentioned how many requests to quote.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FiPhrUUy2n9qMJHsJ1jifRt_doc.png?alt=media&amp;token=62a1a10a-3052-44ab-8746-01077fc7078b" alt="Here is mentioned how many requests to quote." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">3. Here is mentioned how many requests you quoted .</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is mentioned how many requests you quoted.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F5sQBiAbTqK7hcrJRWWnhJr_doc.png?alt=media&amp;token=b258b070-2eb9-4aff-b034-172b418dd615" alt="Here is mentioned how many requests you quoted ." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">4. Here is mentioned how many unpaid PO.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is mentioned how many unpaid PO.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FgUG9WQVp7yMEYGpNRtuE5w_doc.png?alt=media&amp;token=25703461-ebf9-4465-8682-88d34b8d49bf" alt="Here is mentioned how many unpaid PO." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">5. Here is the total amount for all your orders.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is the total amount for all your orders.       </p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FkooTN4BfT29nRj9qjkRA8G_doc.png?alt=media&amp;token=743b4dae-2580-4937-aa2d-8a0f6ec614e6" alt="Here is the total amount for all your orders." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">6. Here is the total amount of payments.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is the total amount of payments.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F1Byxk8Hof3Vynad22ugGnB_doc.png?alt=media&amp;token=f4aab94a-dda1-4f5f-92c7-0e8d7a7e23ca" alt="Here is the total amount of payments." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">7. This is the remaining unpaid amount.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">This is the remaining unpaid amount.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F4e7K5jDpvTW3DMHRYGTicV_doc.png?alt=media&amp;token=95d1a977-3e64-47d0-8dfe-bf7c097123db" alt="This is the remaining unpaid amount." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">8. Here is the Invoices Chart information.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is the Invoices Chart information.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FgNa68aZ1qSKPjca1r251FA_doc.png?alt=media&amp;token=9cbdcede-f0d6-4e3c-a694-0cb94a85dd17" alt="Here is the Invoices Chart information." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">9. Here is the Uploaded Invoices Chart information.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is the Uploaded Invoices Chart information.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FiKioX12KuKChPbqi4mTnKU_doc.png?alt=media&amp;token=055d38f2-beb1-4db7-b994-0729d1b353ca" alt="Here is the Uploaded Invoices Chart information." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">10. Here is the POs Chart information.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Navigate to "Purchase Orders Chart"</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F2mNWUGrnQ4gS531oU5SKS5_doc.png?alt=media&amp;token=e6279fd7-7779-484b-911a-6bddd5537911" alt="Here is the POs Chart information." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">11. Here I will Explain side bar</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here I will Explain side bar</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F4HpcvUHcP6FE1pnow1j3jA_doc.png?alt=media&amp;token=8b5cbda4-5ffc-4504-a13e-a44fb98df362" alt="Here I will Explain side bar" /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">12. Here is a list of Quotations.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is a list of Quotations.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2Fow4GLPYGTdGePpfwbEXAjv_doc.png?alt=media&amp;token=1c1daaef-f4a2-4e0d-a540-3587f50d2235" alt="Here is a list of Quotations." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">13. Here is a list of PO.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is a list of PO. </p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F2anCi6bBxAYuhiUbKMomwB_doc.png?alt=media&amp;token=1cf0b9a9-98a0-4d58-8e42-09b05c10380c" alt="Here is a list of PO." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">14. Here is a list of Product Price.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is a list of Product Price.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FcxYG6MjQL2aZcw5EPwVTif_doc.png?alt=media&amp;token=2bfcdc53-bee1-43d7-b106-c4d7666a5bfa" alt="Here is a list of Product Price." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">15. Here is a list of Payment.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is a list of Payment.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F2bK1x9GgbSU157x6Cc5gbA_doc.png?alt=media&amp;token=77f1ee86-785d-48c2-9d85-4702dab8ada9" alt="Here is a list of Payment." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">16. Here is a list of Users.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is a list of Users.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F4WFy7syaXJUwKi8XYc7Ym7_doc.png?alt=media&amp;token=909ca62f-24fc-4585-bfba-16fd5c5b7fb8" alt="Here is a list of Users." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">17. Here is a list of Bank Account.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Here is a list of Bank Account.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2Fm8VGNMapT8iAZHEAVZ9BbD_doc.png?alt=media&amp;token=26304e78-49d6-46d6-8460-1fb022ada8be" alt="Here is a list of Bank Account." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">18. Click to Guides to get more information about platform.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Click to Guides to get more information about platform.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2F881hbgT1uao4ct33KmAJgr_doc.png?alt=media&amp;token=58b16bac-f155-41e5-bd26-4825707815b3" alt="Click to Guides to get more information about platform." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">19. Click to FAQ to get more information about platform.</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">Click to FAQ to get more information about platform.</p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FmmDZrwzka4x8yPs5VJh2RH_doc.png?alt=media&amp;token=76781311-18c2-4144-8559-e393fcf55fe1" alt="Click to FAQ to get more information about platform." /> <h3 style="width: 100%; word-break: break-word; max-width:100%;">20. By Click here you can view and edit your profile</h3> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">By Click here you can view and edit your profile </p>
            
        </div> <img width="100%" src="https://static.guidde.com/v0/qg%2Fnpx9U1LnjlTRcchVpK3EBnSiFok1%2FjxVxcvvHZWA8Zua8VweSer%2FdMdde1czLXqKonDc8s72UR_doc.png?alt=media&amp;token=8eb1f584-6417-43b4-9368-ee27c4dbaa86" alt="By Click here you can view and edit your profile" /> <div style="margin-top:16px; margin-bottom:16px" >
            <p style="font-size:14px; color: rgba(9, 12, 16, 0.6); width: 100%; word-break: break-word; max-width:100%;">In this guide, we covered the step-by-step instructions for using the Supplier Dashboard application. You learned how to navigate through the different tabs and sections, access important information such as orders amount and payments, and explore additional features like guides and FAQ. Start using the Supplier Dashboard with confidence and maximize your productivity.</p>
            
        </div>
          <div style="margin-right:2px"><a href="https://www.guidde.com" rel="noreferrer" target="_blank" style="text-decoration:none;color:#000000">Powered by <strong style="color:#CB0000">guidde</strong></a></div>
      </div>
  `,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 2,
      label: 'Can I change my username?',
      icon: 'mat:description',
      category: GuideCategory.accountSettings,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 3,
      label: 'How do I change my email?',
      icon: 'mat:movie_filter',
      category: GuideCategory.accountSettings,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 4,
      label: 'Where can I change my timezone?',
      icon: 'mat:description',
      category: GuideCategory.accountSettings,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 5,
      label: 'How do I change my password?',
      icon: 'mat:movie_filter',
      category: GuideCategory.accountSettings,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 6,
      label: 'Which technologies are used?',
      icon: 'mat:description',
      category: GuideCategory.apiHelp,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 7,
      label: 'How do I make a request?',
      icon: 'mat:movie_filter',
      category: GuideCategory.apiHelp,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 8,
      label: 'What are the API Limits?',
      icon: 'mat:description',
      category: GuideCategory.apiHelp,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 9,
      label: 'How can I apply for the API?',
      icon: 'mat:movie_filter',
      category: GuideCategory.apiHelp,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 10,
      label: 'When can I start developing?',
      icon: 'mat:description',
      category: GuideCategory.apiHelp,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 11,
      label: 'Can I get a refund?',
      icon: 'mat:description',
      category: GuideCategory.billing,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 12,
      label: 'How do I pay?',
      icon: 'mat:movie_filter',
      category: GuideCategory.billing,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 13,
      label: 'Which payment methods are supported?',
      icon: 'mat:movie_filter',
      category: GuideCategory.billing,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 14,
      label: 'Do I need to pay VAT?',
      icon: 'mat:description',
      category: GuideCategory.billing,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 15,
      label: 'Where do I find my purchase code?',
      icon: 'mat:description',
      category: GuideCategory.billing,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 16,
      label: 'How do I download the template?',
      icon: 'mat:description',
      category: GuideCategory.firstSteps,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 17,
      label: 'Installation Guide',
      icon: 'mat:movie_filter',
      category: GuideCategory.firstSteps,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 18,
      label: 'Creating your first page',
      icon: 'mat:movie_filter',
      category: GuideCategory.firstSteps,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 19,
      label: 'Customizing your template',
      icon: 'mat:description',
      category: GuideCategory.firstSteps,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 20,
      label: 'How do I contact support?',
      icon: 'mat:description',
      category: GuideCategory.firstSteps,
      content:"this is the conten in how to secure my passeword",
      onClick: (guide) => this.openDialog(guide)
    }
  ];

  accountSettings = this.guides.filter(
    (guide) => guide.category === GuideCategory.accountSettings
  );
  apiHelp = this.guides.filter(
    (guide) => guide.category === GuideCategory.apiHelp
  );
  billing = this.guides.filter(
    (guide) => guide.category === GuideCategory.billing
  );
  firstSteps = this.guides.filter(
    (guide) => guide.category === GuideCategory.firstSteps
  );

  trackById = trackById;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(guide: Guide) {
    this.dialog.open(HelpCenterGuidesGuideComponent, {
      data: guide,
      width: '600px'
    });
  }
}
