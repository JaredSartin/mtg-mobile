(function(){var e=[].slice;window.namespace=function(t,n,r){var i,s,o,u,a,f;arguments.length<3&&(a=[typeof exports!="undefined"?exports:window].concat(e.call(arguments)),t=a[0],n=a[1],r=a[2]),s=t,f=n.split(".");for(o=0,u=f.length;o<u;o++)i=f[o],t=t[i]||(t[i]={});return r(t,s)},window.using=function(){var t,n,r,i,s,o,u,a,f;i=2<=arguments.length?e.call(arguments,0,u=arguments.length-1):(u=0,[]),t=arguments[u++],n={};for(a=0,f=i.length;a<f;a++){s=i[a];for(r in s){o=s[r];if(n[r]!=null)throw"Unable to import namespace: symbol ["+r+"] already imported!";n[r]=o}}return t(n)}}).call(this);