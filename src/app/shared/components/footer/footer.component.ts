import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
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
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class HomeFooterComponent {
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
