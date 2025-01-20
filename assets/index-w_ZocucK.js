import{C,r as k,j as t,b as v,d as n,B as I,R as N}from"./index-DWZXOIwM.js";import{u as R,t as T,z as o,C as u}from"./zod-DhXA8YOo.js";const P="_main_fu6ev_1",B="_container_fu6ev_8",z="_link_fu6ev_16",F="_authError_fu6ev_20",i={main:P,container:B,link:z,authError:F},H=o.object({name:o.string().min(1,"Имя обязательно"),email:o.string().min(1,"Email обязателен").email("Некорректный email"),password:o.string().min(6,"Пароль должен содержать не менее 6 символов")}),V=()=>{var g;const[_]=C(),[d,E]=k.useState(!1),{control:m,handleSubmit:f,formState:{isSubmitting:j,isSubmitted:x,isValid:S,errors:l},clearErrors:h,setError:p}=R({defaultValues:{name:"",email:"",password:""},resolver:T(H),mode:"onSubmit",delayError:400}),b=j||x&&!S,w=()=>E(s=>!s),y=async s=>{const e=await _(s);if(e.error&&"status"in e.error)switch(e.error.status){case 403:p("email",{message:"Email занят"}),p("root.serverError",{message:"Пользователь уже существует"});break}},c=(s,e)=>{var a;x&&((a=l.root)!=null&&a.serverError&&h("root"),e&&h(s))};return t.jsxs("main",{className:i.main,children:[t.jsxs("form",{className:i.container,onSubmit:f(y),children:[t.jsx("h1",{className:"text text_type_main-medium",children:"Регистрация"}),((g=l.root)==null?void 0:g.serverError)&&t.jsx("p",{className:v(i.authError,"text text_type_main-default"),children:l.root.serverError.message}),t.jsx(u,{name:"name",control:m,render:({field:s,fieldState:{invalid:e,error:a}})=>t.jsx(n.Input,{...s,placeholder:"Имя",type:"text",error:e,errorText:a==null?void 0:a.message,onChange:r=>{c("name",e),s.onChange(r)}})}),t.jsx(u,{name:"email",control:m,render:({field:s,fieldState:{error:e,invalid:a}})=>t.jsx(n.Input,{...s,placeholder:"E-mail",type:"text",error:a,errorText:e==null?void 0:e.message,onChange:r=>{c("email",a),s.onChange(r)}})}),t.jsx(u,{name:"password",control:m,render:({field:s,fieldState:{error:e,invalid:a}})=>t.jsx(n.Input,{...s,placeholder:"Пароль",icon:d?"HideIcon":"ShowIcon",type:d?"text":"password",onIconClick:w,errorText:e==null?void 0:e.message,error:a,onChange:r=>{c("password",a),s.onChange(r)}})}),t.jsx(n.Button,{htmlType:"submit",type:"primary",size:"medium",disabled:b,children:"Зарегистрироваться"})]}),t.jsxs("p",{className:"text text_type_main-default text_color_inactive mb-4",children:["Уже зарегистрированы?"," ",t.jsx(I,{to:N.LOGIN,className:i.link,children:"Войти"})]})]})};export{V as default};
