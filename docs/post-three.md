# Javascript: Language of the Web

Javascript is primarily client side language which gets executed on webpages to make it more interactive (in short telling web browser do some dirty work). It was introduced in 1995 as a way to add programs to web pages in the Netscape Navigator browser. It is interpreted and not a compiled language but now days modern web browser use a technology knows as JIT (Just In-Time) compilation. Usually when you execute javascript code in browser console then behind the console it is REPL (Read-Eval-Print-Loop), this is what console runs.

Javascript is Object Oriented Language with the prototype-based organization, having the concept of an object as its core abstraction. When Javascript started expanding outside of Netscape then a standard document was written to describe the way Javascript should work which is ECMAScript standard. ECMA International is an organization that creates standards for technologies and ECMA-262 contains specification for a general purpose scripting language and each has its editions. In practice ECMAScript and Javascript can be used interchangeably.

Note: The ECMAScript specification does not describe the Document Object Model (DOM) which is standardized by the W3C (World Wide Web Consortium) and WHATWG (Web Hypertext Application Technology Working Group).

Now we know that ECMAScript is specification but where does it used in real life ? In general ECMAScript specifications is a set of requirements for implementing ECMAScript, it is useful if you want to implement standards-compliant language features in your ECMAScript implementation or engine like SpiderMoney, V8 etc. Here Javascript supports all functionality outlines in the ECMAScript specification.

ECMA-262 has many specification editions named:

ES1 - 1997<br>
ES2 - 1998<br>
ES3 - 1999<br>
ES4 - Abandoned<br>
ES5 - 2009<br>

By 2012 - All modern browser supported ECMAScript 5.1

ES6 - 2015<br>
ES7 - 2016<br>
ES8 - 2017<br>
ES9 - 2018<br>
ES10 - 2019<br>

ECMAScript version 3 was the widely supported version in the time of Javascript ascent to dominance around 2000 and 2010. During this time there was working going on for version 4 which planned many changes but changing everything would break the existing code which were still running so version 4 was abandoned in 2008. So on 2009 version 5 came with small changes. Then by 2015 some major changes of version 4 were implemented finally in version 6.<br>
So Javascript is a general purpose scripting language that conforms (comply with rules, standards) to the ECMAScript specification.

<b>Fun Fact:</b> When Javascript was being introduced, the Java language was really popular in market and someone throught it was a good idea to try to ride along on this success and name it as Java-script.

### Understanding Javascript Engine and Javascript Runtime
When talking about Javascript there are 2 things which needs to be known for better understanding. Before we talk about that you need to understand one thing that at first Javascript was introduced for web browser but later things changed. Now whenever we need to run any piece of code in Javascript then we need Javascript Engine

Generally javascript engine should do 2 things:<br>
1. [Parsing](https://en.wikipedia.org/wiki/Parsing) and converting your code to runnable commands<br>
2. Using Environment object to interact

Second is Javascript Runtime environment which can be thought of as where the Engine is running but in depth the runtime environment provides the built-in libraries that are available to the program at runtime (during execution)

For example V8 (Javascript engine) is used by both Chrome Browser and NodeJS but their runtime can be different as:<br>
1. Chrome which have the window with DOM objects<br>
2. Node with processes, buffers and more

This was just an overview of what happens behind the scene but later we will how exactly it works after understanding javascript in general.

## Understanding Javascript

We just understood exactly what is Javascript but at the end when you see different explanation of it and then we see some new terms which is so hard to understand but in short the key words are important thing in definition so let's understand it one by one:

#### 1. Lightweight Interpreted
It means Javascript is fairly simple to use and have not many constructs but yes after ECMAScript 5 it is getting much more complex heavier with all the dependencies [Link](https://coderanch.com/t/631906/languages/javascript-lightweight-programming-language)
#### 2. JIT compiled programming language
Javascript started out slow in earlier days but it was fixed by using JIT compilers<br>
One of the major problems of interpreter were that in loop, the same code was executed over and over again which is time consuming but again the feature of interpreter is best fit for Javascript.

Now In case of compiler we need a bit more time in computing and generating the compiler code which is its overhead but compiling any code is useful as we need not to compute over and over again and the optimization feature makes it more fast.

To overcome our problem in Javascript we used JIT compiler. So our Javascript engine is reponsible for running the code and understanding it and these different browser made changes in it by adding monitors aka profiler. These monitor watches the code and note down how many times they have been executed and what types were used. So at start every code is first go through interpreter and gets executed but when the same line of code runs multiple times then that segment of code is termed as warm and then it will hot.

So if monitor finds any warm code segment then it is sent through Baseline Compiler to be compiler then it will store that compilation. While compilation each line of the function is called stub and stub are indexed by line number with their type. If monitor sees that same code segment is getting executed over and over again then the compiler version of code is pulled out.

Now if the monitor observe that the code segment is hot then it takes extra time to make it optimized so it will be sent to Optimization Compiler. Here the OC uses the information of which monitor has gathered and based on that it makes judgement. For example you can have 99 same objects passing where OC made changes based on that but if last object different from the previous one then the compiled optimized code is no more useful, means if JIT assumptions are wrong then the optimized code is sent to trash means de-optimization. There can be a case where optimization and de-optimization takes place over and over again thats why most browser have optimization/deoptimization cycles, like if there are 10 attempts then it will stop trying.

Example: Type Optimization

```
function arraySum(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
}
```