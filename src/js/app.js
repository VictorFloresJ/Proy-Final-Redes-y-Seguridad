function toggleContent(id) {
  const content = document.getElementById(id);

  if (content.classList.contains('activo')) {
    content.classList.remove('activo');
  } else {
    document.querySelectorAll('.modulo_desplegar.activo').forEach((openContent) => {
      openContent.classList.remove('activo');
    });

    content.classList.add('activo');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
