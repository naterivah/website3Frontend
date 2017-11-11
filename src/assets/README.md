```javascript
/**
* Bienvenue sur mon site :-) 
*/
export default class CV {
  
  constructor () {
    this.name = 'Nordine Bittich'
    this.age = '28'
    this.address = 'Chaussée d\'ixelles 219, 1050 Bruxelles'
    this.phone = '(0032)487/31.12.92'
    this.email = 'contact@bittich.be'
    this.github = 'https://github.com/naterivah'
    this.linkedin = 'https://www.linkedin.com/in/nbittich'
    this.languages = ['french', 'english']
  }

  static interests = ['Functional programming', 'Travels', 'Tricking/Martial Arts', 'Game of Go']

  technicalSkills () {
    return {
      languages: () => {
        return {
          java: ['Spring', 'JMS', 'Servlets', 'Jpa/Hibernate', 'Camel', 'JSF', 'JUnit', 'Mockito',
            'Jackson', 'JAX-WS', 'Swing', 'Maven', 'rxJava', 'java 8'],
          php: ['Symfony 2', 'Composer', 'Doctrine 2', 'Twig', 'Slim'],
          js: ['JQuery', 'Ajax', 'JSON', 'AngularJS', 'Grunt', 'Bower', 'Yeoman'],
          html: ['Twitter Bootstrap 3', 'Html 5'],
          sql: ['MySQL', 'Sql Server 2008'],
          other: ['UML', 'Groovy', 'C', 'C#', '.NET MVC 4', 'Cobol', 'Python', 'XML/XSLT']
        }

      },
      methodologies: ['Agile', 'Scrum', 'Test-Driven Development', 'Merise'],
      app_servers: ['Tomcat', 'Jetty', 'Karaf'],
      team: ['Jenkins', 'Subversion', 'Git', 'Sonar', 'Jira'],
      tools: ['IntelliJ', 'NetBeans', 'Visual Studio','Eclipse', 'SoapUI', 'LAMP', 'JMeter'],
      os: ['Linux', 'Windows', 'Mac OSX'],
      other: ['MS Office'],
      soft_skills: ['Assertive', 'Eager to learn', 'Flexible','Team Player']
    }
  }

  professionalExperiences () {
    return {
      voxbone: function (from = 'May 2016', to = 'Decembre 2016') {
        return [
          '  - Maintenance and development of a web portal and its backoffice',
          '  - technologies: Spring, Maven, RabbitMQ, AngularJS, Grunt, Java 8, Hibernate',
          '  - Spring Batch, rxJava, Spring boot'
        ]
      },
      adneom: function (from = 'June 2014', to = 'May 2016') {
        return [
          '  - Development of an ESB(Talend) for Tecteo/VOO',
          '  - technologies: Camel, Spring, Maven, ActiveMQ, Karaf',
          '  - OSGI modules / EIP patterns'
        ]
      },
      vadis: function (from = 'October 2013', to = 'May 2014') {
        return [
          '  - Main Developer for the Web Application "ABC-Engine"',
          '  - Search engine based on Spring, Hibernate, Solr and JSF',
          '  - Performance improvement, refactoring, implementation of new features'
        ]
      }
    }
  }

  educations () {
    return {
      bachelorDegree: (from = 2010, to = 2013) => 'Bachelor of Computer Science - IEPSCF'
    }

  }

}

```
