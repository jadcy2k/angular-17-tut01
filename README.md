# Angular 17 Primer contacto.
* https://angular.dev/tutorials/learn-angular


## INSTALACIÓN

* Hay que actualizar el @angular/cli a la versión 17.xx
* `ng start NUEVA_CARPETA` (nos pregunta por el motor de CSS y si queremos habiliatar SSR -server side rendering-)
* Se arranca en localhost:4200 con: `ng serve --open`


## ARCHIVOS Y CARPETAS

* `src/main.ts`: Es el punto de entrada a nuestra aplicación.
* `bootstrapApplication(AppComponent, appConfig)`: Es la instrucción que lo genera todo.
* `src/index.html`: Es el template principal de toda la app.
* `<app-root></app-root>`: Es el selector del template donde se renderizará la raíz de la app.
* `src/app/app.component.ts`: Es el componente raís de la app. Se define dentro de la carpeta `/app/`.
* Este componente utiliza el decorador `@component` al cual se le pasa un objeto de configuración. Entre los elementos de dicho objeto, está el `selector` cuyo valor coincide con el selector del template principal: `app-root`.
* Si se especifica el atributo `standalone:true`, entonces se podrá importar las dependencias directamente en ese componente. Para ello se añade la propiedad `imports` cuyo valor será un array con las dependencias.
* `templateUrl` y `styleUrl` son el template html y la hoja de estilos CSS respectivamente.
* Se podría también usar templates y estilos inline con las propiedades `template` y `styles` respectivamente (agregando un template string como valor). 
  La tendencia es hacerlo como "single file component" (lógica, template y estilos en el mismo archivo.)
* `src/app/app.config.ts`: Contiene la configuración de la app (providers, dependncias...)
* `src/app/app.routes.ts`: Contiene las diferentes rutas (aunque inicialmente está vacío, pues es una SPA.)

## MODO OSCURO:

Podremos usar el `dark mode` con la siguiente instrucción:

```css
:root {
  color-scheme: light dark;
}
```

Aquí hay una guía muy interesante:
* https://css-tricks.com/almanac/properties/c/color-scheme/
* https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
  

## CREAR NUEVO COMPONENTE

Usamos en la raíz del proyecto la instrucción del terminal: 

```js
ng generate component NOMBRE_COMPONENTE
```

Esto generará una carpeta con el nombre que hemos elegido y tendrá 4 archivos (css, html, ts y spec.ts)

## USAR COMPONENTE DENTRO DE OTRO

Para usar un componente (user.component.ts) dentro de otro (ej. app.component.ts):

1. En 'app.component.ts' importamos el 'user.component':
  
  `import { UserComponent } from "./user/user.component";`

2. Agregamos `userComponent` al array de `imports` de `@Component()`

3. Para usarlo, deberemos de crear un selector en el template `app.component.html`. El nombre de dicho selector deberá de ser el mismo que está indicado en `@Component.selector: 'app-user'`. En este caso, el elemento será `<app-user />` ( o `<app-user></app-user>`).

## USO DE VARIABLES EN TEMPLATES

* Las variables las creamos en la clase del componente (archivo .ts):

```js
export class UserComponent {
  userName:string = 'Harry';
  isLogged:boolean = true;
}
```

* Para usarlas en el template (.html) las debemos de `interpolar` mediante doble llave `{{variable}}`.

```js
<p>Hola {{userName}}</p>
```

## RENDERIZADO CONDICIONAL (@if, @else)

Para mostrar elementos de forma condicional, usaremos las `template syntax` @if y @else en el template (ya sea inline como el ejemplo, o un .html externo):

```js
@Component({
  ...
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
    @else {
      <p>Login</p>
    }
  `,
})
class UserComponent {
  isLoggedIn = true;
}
```

## BUCLES (@for)

Note: the use of `track` is required, you may use the `id` or some other unique identifier. Equivalente a las `key` de React.

```js
@Component({
  ...
  template: `
    @for (os of operatingSystems; track os.id) {
      {{ os.name }}
    }
  `,
})
export class AppComponent {
  operatingSystems = [
    {id: 'win', name: 'Windows'}, 
    {id: 'osx', name: 'MacOS'}, 
    {id: 'linux', name: 'Linux'}
  ];
}
```

## ESTILOS CSS

Es importante entendender que cada archivo .css `encapsula` sus estilos y al renderizar se agrega automaticamente un 'hash' para diferenciarlos de otros componentes. Eso quiere decir que podemos estilar `<H1>` en DIFERENTES componentes simplemente usando el selector `h1 {...}` y no habrá conflictos.

## DRY-RUN

Es un concepto de programación. Simula una ejecución sin hacerla. Por ejemplo, si ejecutamos: `ng generate user --dry-run` en CLI, esto nos mostrará en pantalla una simulación de los archivos generados (o sea, 4) pero NO los crea. Sirve para probar instrucciones.

Podremos entonces probar todas las opciones de la instrucción `ng generate`. Para ver un listado, haremos `ng generate --help`

## GENERAR 'SINGLE-FILE COMPONENT'

Es básicamente un componente .ts que NO tiene archivo de test y los estilos y templates están inline:

* `ng generate component games --skip-tests --inline-style --inline-template --dry-run`: Para poder simular la instrucción.
* `ng generate component games --skip-tests --inline-style --inline-template`: Se realiza la ejecución.

Ejemplo de componente simple:

```js
import {Component} from '@angular/core';
@Component({
  selector: 'app-games',
  styles: ``,
  template: ``,
  standalone: true,
  imports: []
})
export class GamesComponent {}
```


## MANEJO DE EVENTOS

Vinculamos a eventos con la sintaxis de paréntesis (event binding). En el siguiente ejemplo, manejaremos el evento "click" que llamará al método del componente llamado `greet()`:

```JS
@Component({
    ...
    template: `<button (click)="greet()">`
})
class AppComponent {
    greet() {
        console.log('Hello, there 👋');
    }
}
```

## PROPERTY BINDING (VINCULACIÓN DE PROPIEDADES)

La propiedad que queremos vincular con una variable de la clase, la colocaremos entre corchetes [] y su valor será el nombre de la variable (entre comillas):

```js
@Component({
  ...
  template: `<img alt="photo" [src]="imageURL">`
})
export class AppComponent {
    imageURL = 'https://github.com/midudev.png';
}
```


## COMUNICAR DE PADRE A HIJO CON @INPUT

Angular usa un concepto llamado `Input` que es similar a 'props' en otros marcos. Para crear una propiedad Input, utilice el decorador `@Input`:

**Componente hijo**:
```js
class Child {
  @Input() occupation = ''; // Se espera una prop 'occupation'.
}
```

**Componente padre**:
```js
@Component({
  ...
  // Enviamos la prop 'occupation' en el template:
  template: `<child occupation="Angular Developer" />`
})
class Parent {}
```



## COMUNICAR DE HIJO A PADRE CON @OUTPUT

Esto es importante porque cualquier cambio en el componente hijo puede influir en la renderización del padre.

Vamos a ver el siguiente ejemplo: `games.component.ts` es hijo de `app.component.ts`. Cuando renderizamos la lista de 'sistemas operativos', queremos que al hacer click en un elemento, enviemos al padre esa información.

### Paso 1:
En la clase `GamesComponent` (hija) creamos con el decorador `@Output` la variable `sayOsEvent` de tipo `EventEmitter`, o sea estamos indicando que `sayOsEvent` puede emitir eventos asíncronos que podrán ser escuchados en otro lugar de la aplicación:

```js
@Output() sayOsEvent = new EventEmitter<string>();
```

### Paso 2:

El evento `click` en el template invoca al método `sayOS()` el cuál espera un string y a continuación lo emitirá usando el método `emit` del `EventEmitter` 'sayOsEvent' creado en el **paso 1**:

```js
sayOS(operatingSystem: string) {
    this.sayOsEvent.emit(operatingSystem);
}
```

#### 'games.component.ts' queda así:


```js
@Component({
  selector: 'app-games',
  template: `
    <ul>
      @for (os of operatingSystems; track os.id) {
        <li (click)="sayOS(os.name)">{{os.name}}</li>
      }
    </ul>
  `
})
export class GamesComponent {
  operatingSystems = [.....];

  // Output:
  @Output() sayOsEvent = new EventEmitter<string>();

  sayOS(operatingSystem: string) {
    this.sayOsEvent.emit(operatingSystem);
  }
}
```

### Paso 3:

Ahora, en el componente `app.component.ts` (padre) para poder escuchar los eventos (en forma de string) del hijo, deberemos de crear la variable `selectedOS` para almacenar el evento que viene del hijo y un método `getSelectedOS()` para actualizarla:


```js
export class AppComponent {
  // Propiedad dinámica:
  selectedOS = '';
  // Metodo para manipular esa propiedad dinámica:
  getSelectedOS = (os:string) => {
    this.selectedOS = os;
  }
}
```

### Paso 4:

Finalmente, en el template `app.component.html` (padre) deberemos invocar al evento entre paréntesis, que será precisamente el `EventEmitter` creado en el hijo con el `@Output()`, o sea: `(sayOsEvent)`.
Y lo que queremos es que cuando se produzca el evento `sayOsEvent`, se llame al método `getSelectedOS()` el cuál hemos visto en el **paso 3** y que actualizará la variable `selectedOS` con 


```js
<app-games (sayOsEvent) = "getSelectedOS($event)" />

@if (selectedOS !== '') {
  <h3>Has seleccionado {{selectedOS}}</h3>
}
```


## BLOQUE @DEFER, @PLACEHOLDER y @LOADING

INFO: https://angular.dev/guide/defer

### @DEFER ==> VISTAS APLAZABLES (DIFERIDAS)

Envuelva un componente con un bloque `@defer` para posponer su carga a cuando el navegador esté inactivo (la CPU esté libre).

```JS
@defer {
  <comments />
}
```

Las 'vistas aplazables' tienen varias opciones de activación. Agregue un activador de `viewport` (ventana gráfica) para que el contenido difiera la carga una vez que ingrese al viewport.
Ese activador se utiliza mejor cuando se pospone contenido que está lo suficientemente abajo en la página como para que sea necesario desplazarse para verlo. 

```JS
@defer (on viewport) {
  <comments />
}
```

### @PLACEHOLDER ==> MARCADOR DE POSICIÓN

Agregue un bloque `@placeholder` al bloque `@defer`. El bloque @placeholder es donde colocas el html que se mostrará ANTES de que comience la carga diferida.

```JS
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
}
```

### @LOADING ==> BLOQUE DE CARGA

Agregue un bloque `@loading` al bloque `@defer`. El bloque @loading es donde colocas el html que se mostrará MIENTRAS el contenido diferido se está cargando pero aún no ha terminado.

```JS
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
} @loading {
  <p>Loading comments...</p>
}
```

@loading tiene los parámetros `minimum` y `after`. Agregue una duración 'minimum' al bloque @loading para que se muestre DURANTE al menos 2 segundos.

```JS
@loading (minimum 2s) {
  <p>Loading comments...</p>
}
```


Ejemplo todo junto:

```js
import {Component} from '@angular/core';
import {CommentsComponent} from './comments.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      
      <article>
        <p>Angular is my favorite framework, and this is why. Angular has the coolest deferrable view feature that makes defer loading content the easiest and most ergonomic it could possibly be. The Angular community is also filled with amazing contributors and experts that create excellent content. The community is welcoming and friendly, and it really is the best community out there.</p>
        
        <p>I can't express enough how much I enjoy working with Angular. It offers the best developer experience I've ever had. I love that the Angular team puts their developers first and takes care to make us very happy. They genuinely want Angular to be the best framework it can be, and they're doing such an amazing job at it, too. This statement comes from my heart and is not at all copied and pasted. In fact, I think I'll say these exact same things again a few times.
        ....Long content here.....</p>
      </article>

      <!--// Defer, Placeholder and Loading blocks: //-->
      @defer (on viewport) {
        <comments />
      }
      @placeholder {
        <p>Future comments</p>
      }
      @loading (minimum 2s) {
        <p>Loading comments...</p>
      }
    </div>
  `,
  standalone: true,
  imports: [CommentsComponent],
})
export class AppComponent {}
```



## OPTIMIZACIÓN DE IMÁGENES

La optimización de imágenes puede ser un tema complejo, pero Angular maneja la mayor parte por usted, con la directiva `NgOptimizedImage`. 


### Paso 1: Importar directiva 'NgOptimizedImage'
Primero importamos `NgOptimizedImage` desde la biblioteca `@angular/common` y lo agregamos al array `imports` del componente:

```JS
import { NgOptimizedImage } from '@angular/common';
@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  ...
})
```

### Paso 2: Agregar atributo 'ngSrc' en imágenes

Para habilitar la directiva `NgOptimizedImage`, cambie el atributo 'src' por 'ngSrc'. Esto se aplica tanto a fuentes de imágenes estáticas (es decir, src) como a fuentes de imágenes dinámicas (es decir, [src]).

```JS
@Component({
  template: `
    ...
    <li>
      Static Image:
      <img ngSrc="/assets/logo.svg" alt="logo" width="32" height="32" />
    </li>
    <li>
      Dynamic Image:
      <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
    </li>`,
    ...
  `,
})
```

### Paso 3: Propiedades 'width', 'height' o 'fill'

Vemos que cada imagen tiene atributos 'width' y 'height'. Para evitar cambio de diseño (Cumulative Layout Shift, CLS), la directiva 'NgOptimizedImage' requiere ambos atributos de tamaño en cada imagen. Más info: https://web.dev/articles/cls

En situaciones en las que no puede o no quiere especificar un height y width estático para las imágenes, puede utilizar el atributo 'fill' para indicarle a la imagen que actúe como una "imagen de fondo", llenando su elemento contenedor:

```JS
<div class="image-container"> //Container div has 'position: "relative"'
  <img ngSrc="example.com/image.png" fill />
</div>
```

**NOTA**: Para que la imagen 'fill' se represente correctamente, su elemento principal debe tener el estilo `position: "relative", position: "fixed", o position: "absolute"`.


### Paso 4: atributo 'priority'

Una de las optimizaciones más importantes para el rendimiento de carga es priorizar cualquier imagen que pueda ser el "elemento LCP (el más grande en ser pintado)" https://web.dev/articles/optimize-lcp

Para optimizar sus tiempos de carga, asegúrese de agregar el atributo `priority` a su "imagen principal". o cualquier otra imagen que creas que podría ser un elemento LCP.

```JS
<img ngSrc="example.com/image.png" height="600" width="800" priority />
```

### Paso 5 (opcional) preloader de imágenes

https://angular.dev/guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage

`NgOptimizedImage` le permite especificar un cargador de imágenes, que le indica a la directiva cómo formatear las URL para sus imágenes. El uso de un cargador le permite definir sus imágenes con URL cortas y relativas:


```JS
providers: [
  provideImgixLoader('https://my.base.url/'),
]
// ...
// Final URL will be 'https://my.base.url/image.png'
<img ngSrc="image.png" height="600" width="800" />
```


## NEXT STEPS:
https://angular.dev/tutorials/learn-angular/enable-routing



---
---
---
---
---
---
---
---
---
---


# INFO DEL PROYECTO

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
