import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

@NgModule({
  declarations: [

  ],
  imports: [
    NavbarModule,
    SidebarModule,
    FooterModule,
    FixedPluginModule,
    CommonModule,
  ],
  exports: [
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
  ]
})
export class ComponentsModule { }
