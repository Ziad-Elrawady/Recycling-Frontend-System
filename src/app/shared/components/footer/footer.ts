import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Home, LogIn, UserPlus, ShieldCheck, FileText, Cookie, Mail, MapPin, Globe, Facebook, Instagram } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule , TranslateModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class HomeFooterComponent {

  // Icons
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
