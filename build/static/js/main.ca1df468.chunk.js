(this["webpackJsonphangman-react"]=this["webpackJsonphangman-react"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),l=n.n(c),o=n(4),i=n(1),u=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Hangman"),r.a.createElement("p",null,"Find the hidden word - Enter a letter"))},s=function(e){var t=e.wrongLetters.length;return r.a.createElement("svg",{height:"250",width:"200",className:"figure-container"},r.a.createElement("line",{x1:"60",y1:"20",x2:"140",y2:"20"}),r.a.createElement("line",{x1:"140",y1:"20",x2:"140",y2:"50"}),r.a.createElement("line",{x1:"60",y1:"20",x2:"60",y2:"230"}),r.a.createElement("line",{x1:"20",y1:"230",x2:"100",y2:"230"}),t>0&&r.a.createElement("circle",{cx:"140",cy:"70",r:"20"}),t>1&&r.a.createElement("line",{x1:"140",y1:"90",x2:"140",y2:"150"}),t>2&&r.a.createElement("line",{x1:"140",y1:"120",x2:"120",y2:"100"}),t>3&&r.a.createElement("line",{x1:"140",y1:"120",x2:"160",y2:"100"}),t>4&&r.a.createElement("line",{x1:"140",y1:"150",x2:"120",y2:"180"}),t>5&&r.a.createElement("line",{x1:"140",y1:"150",x2:"160",y2:"180"}))},m=function(e){var t=e.wrongLetters;return r.a.createElement("div",{className:"wrong-letters-container"},r.a.createElement("div",null,t.length>0&&r.a.createElement("p",null,"Wrong"),t.map((function(e,t){return r.a.createElement("span",{key:t},e)})).reduce((function(e,t){return null===e?[t]:[e,", ",t]}),null)))},d=function(e){var t=e.selectedWord,n=e.correctLetters;return r.a.createElement("div",{className:"word"},t.split("").map((function(e,t){return r.a.createElement("span",{className:"letter",key:t},n.includes(e)?e:"")})))};function f(e){e(!0),setTimeout((function(){e(!1)}),2e3)}function E(e,t,n,a){var r="win";return console.log("time is ",a),n.split("").forEach((function(t){e.includes(t)||(r="")})),6===t.length&&(r="lose"),0===a&&(r="timeup"),r}var g=function(e){var t=e.correctLetters,n=e.wrongLetters,c=e.selectedWord,l=e.setPlayable,o=e.playAgain,i=e.time,u="",s="";return"win"===E(t,n,c,i)?u="Congratulations! You won! \ud83d\ude03":"lose"===E(t,n,c,i)?(u="Unfortunately, you lost. \ud83d\ude15",s="...the word was: ".concat(c)):"timeup"===E(t,n,c,i)&&(u="Unfortunately, Time is Up. \ud83d\ude15",s="...the word was: ".concat(c)),Object(a.useEffect)((function(){""!==u&&l(!1)}),[u,l]),r.a.createElement("div",{className:"popup-container",style:""!==u?{display:"flex"}:{}},r.a.createElement("div",{className:"popup"},r.a.createElement("h2",null,u),r.a.createElement("h3",null,s),""!==u&&r.a.createElement("button",{onClick:o},"Play Again")))},h=function(e){var t=e.showNotification;return r.a.createElement("div",{className:"notification-container ".concat(t?"show":"")},r.a.createElement("p",null,"You have already entered this letter"))},y=(n(12),{english:["application","programming","interface","wizard"],french:["ordinateur","programmation","interface","sorcier"]}),v="english",p=y[v][Math.floor(Math.random()*y[v].length)];var w=function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)([]),E=Object(i.a)(l,2),w=E[0],b=E[1],x=Object(a.useState)([]),j=Object(i.a)(x,2),O=j[0],L=j[1],N=Object(a.useState)(!1),S=Object(i.a)(N,2),k=S[0],M=S[1],C=Object(a.useState)(30),F=Object(i.a)(C,2),W=F[0],I=F[1],A=Object(a.useState)(0),P=Object(i.a)(A,2),T=P[0],U=P[1],J=Object(a.useState)([]),R=Object(i.a)(J,2),Y=R[0],z=R[1];return Object(a.useEffect)((function(){var e=function(e){var t=e.key,a=e.keyCode;if(n&&a>=65&&a<=90){var r=t.toLowerCase();p.includes(r)?w.includes(r)?f(M):(U((function(e){return e+1})),b((function(e){return[].concat(Object(o.a)(e),[r])}))):O.includes(r)?f(M):(U((function(e){return e-1})),L((function(e){return[].concat(Object(o.a)(e),[r])})))}},t=setInterval((function(){W>0&&n?I((function(e){return e-1})):(c(!1),clearInterval(t))}),1e3);return window.addEventListener("keydown",e),function(){clearInterval(t),window.removeEventListener("keydown",e)}}),[w,O,n,W]),Object(a.useEffect)((function(){0===W&&c(!1)}),[W]),r.a.createElement(r.a.Fragment,null,r.a.createElement(u,null),r.a.createElement("div",{className:"language-select"},r.a.createElement("label",{htmlFor:"language"},"Select Language: "),r.a.createElement("select",{id:"language",onChange:function(e){v=e.target.value,p=y[v][Math.floor(Math.random()*y[v].length)],b([]),L([]),U(0)}},r.a.createElement("option",{value:"english"},"English"),r.a.createElement("option",{value:"french"},"French"))),r.a.createElement("div",{className:"game-container"},r.a.createElement(s,{wrongLetters:O}),r.a.createElement(m,{wrongLetters:O}),r.a.createElement(d,{selectedWord:p,correctLetters:w,updateScore:function(){U((function(e){return e+1}))}})),r.a.createElement(g,{correctLetters:w,wrongLetters:O,selectedWord:p,setPlayable:c,playAgain:function(){c(!0),I(30),b([]),L([]),z((function(e){return[].concat(Object(o.a)(e),[T])})),U(0),p=y[v][Math.floor(Math.random()*y[v].length)]},time:W,score:T}),r.a.createElement(h,{showNotification:k}),r.a.createElement("div",{className:"timer"},"Time Remaining: ",W,"s"),r.a.createElement("div",{className:"score"},"Score: ",T),r.a.createElement("div",{className:"scoreboard"},r.a.createElement("h3",null,"Scoreboard"),Y.map((function(e,t){return r.a.createElement("div",{key:t},"Round ",t+1,": ",e)}))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))},7:function(e,t,n){e.exports=n(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.ca1df468.chunk.js.map