/* Angular Core */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
/* Custom Components */
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainModule } from "./components/main/main.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, MainModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
