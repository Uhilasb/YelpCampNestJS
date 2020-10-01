import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as hbs from 'hbs';
import  { resolve, join } from 'path';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as Express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const viewsPath= join(__dirname, '../public/views');
  // app.engine('.hbs', exphbs({ 
  //   extname: '.hbs',
  //   defaultLayout: 'landing',
  //   layoutsDir: join(__dirname, '/views'),
  //   partialsDir: [
  //     join(__dirname, '/views/partials')
  //   ]
  // }));
  // app.set('views', viewsPath);
  // // app.set('view engine', '.hbs');
  //-----------------------------------------------
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..','views'));
  app.setViewEngine('hbs');
  hbs.registerHelper({
    tr:  function(v1)       {return v1},
    eq:  function(v1, v2)  {return v1 === v2;},
    ne:  function(v1, v2)  {return v1 !== v2;},
    lt:  function(v1, v2)  {return v1 < v2;},
    gt:  function(v1, v2)  {return v1 > v2;},
    lte: function(v1, v2) {return v1 <= v2;},
    gte: function(v1, v2) {return v1 >= v2;},
    a: function(v1, v2) {return v1 && v2;},
    o:  function(v1, v2) {return v1 || v2;},
    and(){
      return Array.prototype.slice.call(arguments, Boolean);
    },
    or(){
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
  });
  hbs.registerHelper('ifEquals', function(v1, v2, options){
    if(v1 === v2){
      return options.fn(this);
    }
    return options.inverse(this);
  });
  hbs.registerHelper('dateFromat', require('handlebars-dateformat'));
  // app.setViewEngine('pug');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  
  app.use(methodOverride('_method'));
  app.use(
    session({
    secret:'hello-world',
    resave: false,
    saveUninitialized: false,
  }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);

}
bootstrap();
