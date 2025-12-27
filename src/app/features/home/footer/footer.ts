import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import {
  Home,
  LogIn,
  UserPlus,
  ShieldCheck,
  FileText,
  Cookie,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Instagram
} from 'lucide-angular';

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class HomeFooterComponent {

  // 👇 لازم تتعرّف هنا
  Home = Home;
  LogIn = LogIn;
  UserPlus = UserPlus;
  ShieldCheck = ShieldCheck;
  FileText = FileText;
  Cookie = Cookie;
  Mail = Mail;
  MapPin = MapPin;
  Globe = Globe;
  Facebook = Facebook;
  Instagram = Instagram;

}
