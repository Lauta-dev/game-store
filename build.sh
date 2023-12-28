backend="./backend/"
frontend="./frontend/"

pm="npm"

function crearBuild() {
  echo "Creando build del backend en ${backend}"
  cd "${backend}"
  ${pm} install
  echo "Build realizada"

  echo " "
  echo "Creando build del frontend en ${frontend}"
  cd "../"
  cd "${frontend}"
  ${pm} install
  echo "Build realizada"
}






