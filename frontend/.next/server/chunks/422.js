exports.id=422,exports.ids=[422],exports.modules={5470:(e,t,s)=>{Promise.resolve().then(s.bind(s,2917))},9249:(e,t,s)=>{Promise.resolve().then(s.bind(s,4144))},1183:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2994,23)),Promise.resolve().then(s.t.bind(s,6114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,9671,23)),Promise.resolve().then(s.t.bind(s,1868,23)),Promise.resolve().then(s.t.bind(s,4759,23))},2917:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>b});var r=s(326),a=s(2913),i=s(7577),l=s(6137),n=s(434),d=s(5047);let o=({content:e})=>{let t=(0,d.usePathname)().includes(e.url);return(0,r.jsx)(n.default,{href:`/${e.url}`,scroll:!1,children:(0,r.jsxs)("div",{className:`py-4 px-3 mx-3 flex flex-row justify-start items-center gap-4 ${t?"bg-primary rounded-xl":" hover:bg-menuIconBackground hover:rounded-xl"}`,children:[(0,r.jsx)("div",{className:`h-10 w-10 flex items-center justify-center rounded-full  ${t?"bg-primary":"bg-menuIconBackground"}`,children:(0,r.jsx)(l.JO,{icon:e.icon,fontSize:t?25:20,className:t?"text-white":""})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:`text-lg mb-1 ${t?"text-white":""}`,children:e.title}),(0,r.jsx)("p",{className:`text-sm capitalize  ${t?"text-white":"text-borderColorLight"}`,children:e.subtitle})]})]})})};var c=s(7966);let u=()=>{let e={dashboard:[{title:"Cases",subtitle:"All Cases",url:"cases",icon:"material-symbols:dashboard-rounded"}],nurses:[{title:"Nurses",subtitle:"Manage nurses",url:"nurses",icon:"mingcute:nurse-fill"}]},[t,s]=(0,i.useState)("nurse");return(0,i.useEffect)(()=>{(async()=>{let e=await (0,c.eU)();e?.nurse&&s(e.nurse.role)})()},[]),(0,r.jsxs)("div",{className:"px-6 py-9 border border-r-sidebarBorderColor h-lvh flex flex-col gap-6",children:[(0,r.jsx)("div",{children:(0,r.jsx)(a.Z,{})}),(0,r.jsx)("div",{children:(0,r.jsx)(o,{content:e.dashboard[0]})}),"nurse"!==t&&(0,r.jsx)("div",{children:(0,r.jsx)(o,{content:e.nurses[0]})})]})};var m=s(9174),x=s(6226);let h=({user:e,title:t})=>{let s=(0,d.useParams)(),[a,o]=(0,i.useState)(!1),[c,u]=(0,i.useState)("Overview"),h=(0,d.useRouter)(),f=async()=>{localStorage.removeItem("user"),h.replace("/")};return(0,i.useEffect)(()=>{let e=window.location.href.split("/");u(s.id?`${s.id?.substring(0,20)}...`:e[e.length-1]?e[e.length-1]:"overview")},[s]),(0,r.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,r.jsx)("h1",{className:"text-primary text-2xl capitalize",children:c}),(0,r.jsxs)("div",{className:"mr-6 flex flex-row gap-3 items-center text-notificationIconColor",children:[(0,r.jsx)("div",{className:"",children:(0,r.jsx)(l.JO,{icon:"zondicons:notification",fontSize:20})}),(0,r.jsx)("div",{children:"|"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{children:e.firstName})," ",(0,r.jsx)("span",{children:e.lastName})]}),(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"relative inline-block text-left",children:[(0,r.jsx)("div",{onClick:()=>o(e=>!e),children:(0,r.jsx)(x.default,{className:"rounded-full cursor-pointer hover:border hover:border-borderColorLight",loader:()=>e.photoUrl,src:e.photoUrl?e.photoUrl:m.az,alt:"Rounded avatar",height:40,width:40,unoptimized:!0})}),(0,r.jsx)("div",{className:`${a?"":"hidden"} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`,role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button",tabIndex:-1,children:(0,r.jsxs)("div",{className:"py-1",role:"none",children:[(0,r.jsx)(n.default,{href:"#",className:"block px-4 py-2 text-sm text-gray-700",role:"menuitem",tabIndex:-1,id:"menu-item-2",children:"Profile"}),(0,r.jsx)("button",{type:"button",className:"block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-backgroundColor2",role:"menuitem",tabIndex:-1,id:"menu-item-3",onClick:f,children:"Log out"})]})})]})})]})]})};var f=s(9394);function b({children:e}){let[t,s]=(0,i.useState)(!1);return(0,r.jsx)("html",{lang:"en",children:(0,r.jsx)("body",{children:(0,r.jsxs)("div",{className:"flex flex-row",children:[(0,r.jsxs)("div",{className:`${t?"w-3/4":"md:w-2/6"}`,children:[(0,r.jsxs)("button",{type:"button",className:"md:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm text-primary rounded-lg bg-gray-100 fixed z-10",onClick:()=>s(e=>!e),children:[(0,r.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,r.jsx)("svg",{className:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{clipRule:"evenodd",fillRule:"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})})]}),(0,r.jsx)("div",{className:`w-full ${t?"fixed bg-backgroundColor":"max-md:hidden"}`,children:(0,r.jsx)(u,{})})]}),(0,r.jsxs)("main",{className:"w-full p-6 mt-8",children:[(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)(h,{user:{},title:"Overview"}),(0,r.jsx)(f.Ix,{})]}),(0,r.jsx)("div",{children:e})]})]})})})}s(5996)},4144:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(326),a=s(9532),i=s.n(a);function l({children:e}){return(0,r.jsx)("html",{lang:"en",children:(0,r.jsx)("body",{className:i().className,children:e})})}s(7577),s(4047)},9174:(e,t,s)=>{"use strict";s.d(t,{UN:()=>r,az:()=>a});let r="eClinic@2025",a="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"},2940:(e,t,s)=>{"use strict";s.d(t,{y:()=>r});let r=async(e,t,s)=>{try{let r=await fetch(`https://eclinic-backend.vercel.app/${e}`,{method:s||"GET",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(404===r.status)return null;r.ok||console.warn(`Response status: ${r.status}`);let a=await r.json();return{status:r.status,result:a}}catch(e){return console.warn(e),null}}},2516:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(326);s(7577);var a=s(6137);let i=()=>(0,r.jsx)("div",{className:"flex justify-center items-center py-[15vh]",children:(0,r.jsx)(a.JO,{icon:"eos-icons:loading",className:"text-primary",fontSize:42})})},523:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var r=s(326);s(7577);let a=({children:e,className:t})=>(0,r.jsx)("div",{className:`bg-white border border-backgroundColor2 rounded-lg max-h-[85vh] overflow-auto ${t}`,children:e})},2913:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var r=s(326);s(7577);let a=()=>(0,r.jsx)("div",{className:"flex justify-center align-middle items-center gap-2",children:(0,r.jsx)("div",{children:(0,r.jsx)("h1",{className:"font-medium text-primary text-3xl",children:"eClinic"})})})},7966:(e,t,s)=>{"use strict";s.d(t,{DW:()=>i,eU:()=>a}),s(5424);var r=s(6242),a=(0,r.$)("4d3caaacf1dc6941f6e87b8ede1befd2ad8fd689"),i=(0,r.$)("388779bd1e7210b5e4600a751b3bc706bfbe8eb4");(0,r.$)("5008d2202b1656ad75fc7a3a75204a5f37d7a0e0"),(0,r.$)("443075d667dc951ff47c91995945e3726cf03214")},461:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`/Users/busydev/Desktop/efishe/eclinic/frontend/app/(admin)/layout.tsx#default`)},1506:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`/Users/busydev/Desktop/efishe/eclinic/frontend/app/layout.tsx#default`)},2937:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$ACTION_0:()=>c,$$ACTION_1:()=>m,$$ACTION_2:()=>h,$$ACTION_3:()=>b,emailValidate:()=>o,extractInformationFromToken:()=>f,formatDate:()=>u,formatHtmlEmail:()=>x});var r=s(7745);s(6461);var a=s(255),i=s.n(a),l=s(8477),n=s(3973),d=s(5723);let o=(0,r.j)("78b77314d23e6547fc373886d7fc18b8e9d1f61e",c);async function c(e){return e?/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())?e:"Invalid Email!":"No Email Provided!"}let u=(0,r.j)("f2ac9105eeb522756cf4ec752283d52693a7969d",m);async function m(e,t){return i()(e).format(t||"MMM Do YY")}let x=(0,r.j)("af3cfa61c01b24f313f62164aac2d89690cc28d1",h);async function h(e,t){return`
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f6f6f6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .email-header {
      margin-bottom: 20px;
      text-align: center;
    }
    .email-content {
      text-align: left;
      color: #333333;
      text-align: center;
    }
    .email-footer {
      margin-top: 20px;
      color: #02c39a;
      font-size: 12px;
      text-align: center;
    }
    .logo {
    color: #02c39a;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
    <h1 class="logo">eClinic</h1>
    </div>
    <div class="email-content">
      <h2>${e}</h2>
      <div>${t}</div>
    </div>
    <div class="email-footer">
      <hr style="border: 0; border-top: 1px solid #eee;">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>

`}let f=(0,r.j)("43422d9c965f9e40ce8c4352e4a53313d8f16805",b);async function b(){let e=(await (0,n.cookies)()).get("token");return e?(0,l.o)(e?.value):{}}(0,d.h)([o,u,x,f]),(0,r.j)("388779bd1e7210b5e4600a751b3bc706bfbe8eb4",o),(0,r.j)("5008d2202b1656ad75fc7a3a75204a5f37d7a0e0",u),(0,r.j)("443075d667dc951ff47c91995945e3726cf03214",x),(0,r.j)("4d3caaacf1dc6941f6e87b8ede1befd2ad8fd689",f)},4047:()=>{}};