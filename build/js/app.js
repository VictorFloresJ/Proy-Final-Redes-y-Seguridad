function toggleContent(t){const e=document.getElementById(t);e.classList.contains("activo")?e.classList.remove("activo"):(document.querySelectorAll(".modulo_desplegar.activo").forEach(t=>{t.classList.remove("activo")}),e.classList.add("activo"))}document.addEventListener("DOMContentLoaded",()=>{document.body.classList.add("loaded")});
//# sourceMappingURL=app.js.map
