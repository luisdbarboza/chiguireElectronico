const users = [
  {
    id: 1,
    nickname: "luisbarnav",
    email: "luisdavidbn23@gmail.com",
    password: "12345",
    profilePic: "/images/perfil.png",
  },
  {
    id: 2,
    nickname: "jorgebarnav",
    email: "jorgeluis@gmail.com",
    password: "12345678",
    profilePic: null,
  },
];

const categories = [
  {
    id: 1,
    name: "Computadoras",
    link: "/Category/Computadoras",
  },
  {
    id: 2,
    name: "Smartphones",
    link: "/Category/Smartphones",
  },
  {
    id: 3,
    name: "Reviews",
    link: "/Category/Reviews",
  },
  {
    id: 4,
    name: "Android",
    link: "/Category/Android",
  },
  {
    id: 5,
    name: "Videojuegos",
    link: "/Category/Videojuegos",
  },
  {
    id: 6,
    name: "Linux",
    link: "/Category/Windows",
  },
];

const topStories = [
  {
    id: 1,
    title: "Estos fueron los anuncios de la conferencia de Xbox Series X",
    imgSrc: "images/halo.jpg",
  },
  {
    id: 2,
    title:
      "Conoce los lenguajes de programacion mas amados y mas odiados segun GitHub",
    imgSrc: "images/coding.jpg",
  },
  {
    id: 3,
    title:
      "Facebook estudia si sus algoritmos de IA estan sesgados racialmente",
    imgSrc: "images/facebookai.jpg",
  },
  {
    id: 4,
    title:
      "CMD FM, escucha musica estilo lineas de comandos desde tu navegador web",
    imgSrc: "images/cmdfm.png",
  },
  {
    id: 5,
    title: "Estos fueron los anuncios de la conferencia de Xbox Series X",
    imgSrc: "images/halo.jpg",
  },
  {
    id: 6,
    title:
      "Conoce los lenguajes de programacion mas amados y mas odiados segun GitHub",
    imgSrc: "images/coding.jpg",
  },
  {
    id: 7,
    title:
      "Facebook estudia si sus algoritmos de IA estan sesgados racialmente",
    imgSrc: "images/facebookai.jpg",
  },
  {
    id: 8,
    title:
      "CMD FM, escucha musica estilo lineas de comandos desde tu navegador web",
    imgSrc: "images/cmdfm.png",
  },
  {
    id: 9,
    title: "Estos fueron los anuncios de la conferencia de Xbox Series X",
    imgSrc: "images/halo.jpg",
  },
  {
    id: 10,
    title:
      "Conoce los lenguajes de programacion mas amados y mas odiados segun GitHub",
    imgSrc: "images/coding.jpg",
  },
];

const latestStories = [
  {
    id: 1,
    title:
      "Python es el BASIC de nuestros tiempos. Esta en todos lados, y por buenas razones.",
    description:
      "Con usos que van desde el machine learning al desarrollo web y la seguridad informatica, este lenguaje se ha vuelto muy atractivo para los programadores.",
    author: "Edward Elric",
    date: "14 de Julio de 2020",
    category: "Programacion",
    comentarios: 10,
    highlight: true,
    imgSrc: "/images/python-qhd.jpg",
    body: `
    <div class="post-body">
      

      <div class="post-text-content">
          <p>
              Desde hace algunos años, Python es la palabra de moda en el vocabulario de cualquier programador, 
              pero ¿por qué? Para poder responder a esta pregunta, empecemos por el principio, ¿Qué es Pyhton?
              <br>
              <br>
          </p>
          <p>
              Python es un lenguaje de programación de código abierto, orientado a objetos, muy simple y fácil de 
              entender. Tiene una sintaxis sencilla que cuenta con una vasta biblioteca de herramientas, que hacen 
              de Python un lenguaje de programación único.
              <br>
              <br>
          </p>
          <p>
              Una de las ventajas principales de aprender Python es la posibilidad de crear un código con gran 
              legibilidad, que ahorra tiempo y recursos, lo que facilita su comprensión e implementación..
              <br>
              <br>
          </p>
          <p>
              Estos factores y otros que veremos más adelante, han hecho que Python se convierta en uno de los 
              idiomas de programación más utilizados. Desde aplicaciones web hasta la inteligencia artificial, 
              los usos de Python son infinitos.
              <br>
              <br>
          </p>

          <h3>Ciencia de datos</h3>
          <br>

          <p>Python está creciendo de la mano de Data Science como una de las profesiones mejor valoradas, cuya base
                se asienta en lenguajes matemáticos como R y con Python gracias a librerías y framework como PyBrain, NumPy o PyMySQL. 
              <br>
              <br>
              Un buen punto de partida para empezar a trabajar en Data Science es tener una buena base de Python. Puedes encontrar algunos cursos interesantes enCoursera o Udacit : Python for Data Science ofrecido por IBM en Coursera o Become a Data Analyst en Udacity.
              
          </p>

          <br>
          <h3>Machine Learning</h3>
          <br>
          
          <p>
              El auge del Deep Learning con algunos framework como Tensor Flow también ha motivado a muchos desarrolladores a aprender Python.
          </p>
          <br>
      </div>
          <div class="post-body">
      

      <div class="post-text-content">
          <p>
              Desde hace algunos años, Python es la palabra de moda en el vocabulario de cualquier programador, 
              pero ¿por qué? Para poder responder a esta pregunta, empecemos por el principio, ¿Qué es Pyhton?
              <br>
              <br>
          </p>
          <p>
              Python es un lenguaje de programación de código abierto, orientado a objetos, muy simple y fácil de 
              entender. Tiene una sintaxis sencilla que cuenta con una vasta biblioteca de herramientas, que hacen 
              de Python un lenguaje de programación único.
              <br>
              <br>
          </p>
          <p>
              Una de las ventajas principales de aprender Python es la posibilidad de crear un código con gran 
              legibilidad, que ahorra tiempo y recursos, lo que facilita su comprensión e implementación..
              <br>
              <br>
          </p>
          <p>
              Estos factores y otros que veremos más adelante, han hecho que Python se convierta en uno de los 
              idiomas de programación más utilizados. Desde aplicaciones web hasta la inteligencia artificial, 
              los usos de Python son infinitos.
              <br>
              <br>
          </p>

          <h3>Ciencia de datos</h3>
          <br>

          <p>Python está creciendo de la mano de Data Science como una de las profesiones mejor valoradas, cuya base
                se asienta en lenguajes matemáticos como R y con Python gracias a librerías y framework como PyBrain, NumPy o PyMySQL. 
              <br>
              <br>
              Un buen punto de partida para empezar a trabajar en Data Science es tener una buena base de Python. Puedes encontrar algunos cursos interesantes enCoursera o Udacit : Python for Data Science ofrecido por IBM en Coursera o Become a Data Analyst en Udacity.
              
          </p>

          <br>
          <h3>Machine Learning</h3>
          <br>
          
          <p>
              El auge del Deep Learning con algunos framework como Tensor Flow también ha motivado a muchos desarrolladores a aprender Python.
          </p>
          <br>
      </div>
    `,
  },
  {
    id: 2,
    title:
      "Microsoft compra GitHub y demuestra que es uno de los grandes del OSS.",
    author: "Roberto Ballesteros",
    date: "12 de Julio",
    category: "Web",
    comentarios: 5,
    highlight: false,
    imgSrc: "/images/microsoftgithub.png",
  },
  {
    id: 3,
    title: "El kernel de linux llegara a windows update.",
    author: "Luis Barboza",
    date: "12 de Julio",
    category: "Linux",
    highlight: false,
    imgSrc: "/images/windowslinux.jpeg",
    body: `
    <div class="post-body">
      <figure class="post-main-img">
          <img src="/images/windowslinux.jpeg" alt="titular de la noticia">
      </figure>

      <div class="post-text-content">
          <p>Windows Subsystem for Linux 2 (WSL2) será una de las novedades más destacadas de la próxima versión de Windows 10, 
              cuyo lanzamiento está previsto para el mes que viene o el siguiente. Y se trata de una novedad que cambiará el 
              Linux en Windows provisto por Microsoft para sus usuarios.
              <br>
              <br>
          </p>
          <p>
              En concreto, Windows 10 versión 2004 desligará el kernel Linux de la imagen de instalación del sistema, por lo que 
              deberá ser el usuario quien lo instale a parte por su propia cuenta. Por el contrario, una vez instalado, el kernel
              Linux en Windows 10 se actualizará junto con el resto de software de Microsoft a través de Windows Update.
              <br>
              <br>
          </p>
          <p>
              De hecho, más que como el software de Microsoft, Windows 10 gestionará las actualizaciones del kernel Linux en Windows como 
              si de un controlador gráfico o de otro tipo se tratase, y aunque el usuario podrá simplemente esperar a que le llegue la 
              actualización, también podrá buscarla manualmente para recibirla cuanto antes.
              <br>
              <br>
          </p>
          <p>
              Dentro de la versión inicial de Windows 10 versión 2004 y en la última compilación de vista previa de Windows Insiders, necesitarás 
              instalar el kernel de Linux en Windows a mano por ahora, y recibirás una actualización en unos meses que agregará la instalación y 
              los servicios automáticos», explican desde Microsoft.
              <br>
              <br>
          </p>

          <p>
              Los usuarios del programa Windows Insider que deseen probar WSL2 ya, puedes hacerlo siguiendo las siguientes instrucciones, siempre 
              que cuenten con la compilación Windows 10 build 19041.153 o superior:
              <br>
              <br>
          </p>

          <pre><code>
              wsl
              wsl --set-version  2, - wsl --set-default-version 2
              wsl --import y wsl --export
          </code></pre>

          <p></p>
      </div>
  </div>
    `,
  },
  {
    id: 4,
    title: "No, el 5G no te puede hacer daño, la ciencia lo demuestra.",
    author: "Andreina Gutierrez",
    date: "8 de Julio",
    category: "Cultura General",
    comentarios: 20,
    highlight: false,
    imgSrc: "/images/5g.jpeg",
  },
  {
    id: 5,
    title:
      "Facebook mostrará una advertencia antes de compartir noticias sobre la COVID-19",
    author: "Ricardo Badillo",
    date: "6 de Julio",
    category: "Web",
    comentarios: 12,
    highlight: true,
    imgSrc: "/images/advertencia-facebook.jpg",
  },
  {
    id: 6,
    title: "¿Donde almacena tus datos Telegram?",
    author: "Ray Bradbury",
    date: "6 de Julio",
    category: "Apps",
    comentarios: 4,
    highlight: true,
    imgSrc: "/images/donde-telegram.jpg",
  },
  {
    id: 7,
    title: "Intel sufre la mayor fuga de su historia",
    author: "Eikichi Onizuka",
    date: "7 de agosto de 2020",
    category: "Computadoras",
    comentarios: 0,
    highlight: true,
    imgSrc: "/images/intel20.jpg",
    description:
      "Alguien en Twitter comenzó a postear enlaces a un archivo que contiene el volcado de la información con más de 20 GB de datos de información confidencial de Intel.",
  },
  {
    id: 8,
    title: "Xiaomi apuesta por AMD para el RedmiBook 16",
    author: "Kenji Endo",
    date: "6 de agosto de 2020",
    category: "Computadoras",
    highlight: true,
    imgSrc: "/images/xiaomi.jpg",
    description:
      "El gigante chino ha confirmado el diseño del Xiaomi RedmiBook 16, un portátil con el que la compañía quiere subir el listón en términos de potencia y de movilidad.",
  },
];

/**************************************************************************** */

// //Crea el arbol de comentarios
// let commentsPost1 = new CommentsTree();

// //crea un objeto de la clase Comment
// let date1 = new Date(2021, 3, 13, 0, 40, 0);
// date1 = `${date1.getFullYear()}-${date1.getMonth()}-${date1.getDay()}`;

// let comment1 = new Comment(
//   1,
//   2,
//   "Java es lo mejor",
//   "jorgebn",
//   "/images/icons/man.png",
//   date1,
//   25,
//   3
// );

// //inserta el comentario en un hilo
// commentsPost1.insert(comment1);

// //repite
// let date2 = new Date(2021, 3, 13, 0, 48, 15);
// date2 = `${date2.getFullYear()}-${date2.getMonth()}-${date2.getDay()}`;
// let comment2 = new Comment(
//   2,
//   1,
//   "No, Visual Basic es la hostia!!!!",
//   "luisbarnav",
//   "/images/perfil.png",
//   date2,
//   12,
//   56
// );

// commentsPost1.insert(comment2, 1);

// //repite
// let date3 = new Date(2021, 3, 13, 12, 20, 30);
// date3 = `${date3.getFullYear()}-${date3.getMonth()}-${date3.getDay()}`;
// let comment3 = new Comment(
//   3,
//   2,
//   "No, C# es mejor peasants",
//   "jorgebg",
//   "/images/icons/man.png",
//   date3,
//   12,
//   56
// );

// commentsPost1.insert(comment3, 2);

// let date4 = new Date(2021, 3, 13, 12, 20, 30);
// date4 = `${date4.getFullYear()}-${date4.getMonth()}-${date4.getDay()}`;
// let comment4 = new Comment(
//   3,
//   1,
//   "Todo el mundo sabe que hasta COBOL es mejor que esta bazofia",
//   "luisbarnav",
//   "/images/perfil.png",
//   date4,
//   12,
//   56
// );

// commentsPost1.insert(comment4);

// /******************************************************************* */

// let listOfComments = [
//   {
//     id: 1,
//     comments: commentsPost1,
//   },
// ];

const articles_per_category = {
  Computadoras: [
    {
      id: 1,
      title: "Intel sufre la mayor fuga de su historia",
      author: "Eikichi Onizuka",
      date: "7 de agosto de 2020",
      category: "Computadoras",
      highlight: true,
      imgSrc: "/images/intel20.jpg",
      description:
        "Alguien en Twitter comenzó a postear enlaces a un archivo que contiene el volcado de la información con más de 20 GB de datos de información confidencial de Intel.",
    },
    {
      id: 2,
      title: "Xiaomi apuesta por AMD para el RedmiBook 16",
      author: "Kenji Endo",
      date: "6 de agosto de 2020",
      category: "Computadoras",
      highlight: true,
      imgSrc: "/images/xiaomi.jpg",
      description:
        "El gigante chino ha confirmado el diseño del Xiaomi RedmiBook 16, un portátil con el que la compañía quiere subir el listón en términos de potencia y de movilidad.",
    },
    {
      id: 3,
      title:
        "Nueva información confirmaría la fecha de estreno del Xbox Series X",
      author: "Kanna Endo",
      date: "6 de agosto de 2020",
      category: "Computadoras",
      highlight: true,
      imgSrc: "/images/xbox.jpg",
      description:
        "El gigante chino ha confirmado el diseño del Xiaomi RedmiBook 16, un portátil con el que la compañía quiere subir el listón en términos de potencia y de movilidad.",
    },
    {
      id: 4,
      title:
        "Facebook mostrará una advertencia antes de compartir noticias sobre la COVID-19",
      author: "Steven Fernandez",
      date: "8 de julio",
      category: "Computadoras",
      highlight: false,
      imgSrc: "/images/advertencia_facebook.jpg",
      description:
        "El gigante chino ha confirmado el diseño del Xiaomi RedmiBook 16, un portátil con el que la compañía quiere subir el listón en términos de potencia y de movilidad.",
    },

    {
      id: 5,
      title: "¿Donde almacena tus datos Telegram?",
      author: "Ray Bradbury",
      date: "8 de julio",
      category: "Computadoras",
      highlight: false,
      imgSrc: "/images/donde-telegram.jpg",
      description:
        "El gigante chino ha confirmado el diseño del Xiaomi RedmiBook 16, un portátil con el que la compañía quiere subir el listón en términos de potencia y de movilidad.",
    },
  ],
};

export {
  users,
  categories,
  topStories,
  latestStories,
  articles_per_category,
};
