//función para consulta todos los productos 
async function getAllProducts(){
  //cabecera de la petición
  let headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  }
  //petición al servidor
  //fetch("end point del servidor"
  let response = await fetch("http://localhost:3000/products", { 
    //tipo de petición
    method: "GET",
    //agregar cabecera
    headers: headersList
  });

  //conversión de la respuesta en texto
  // let data = await response.text();
  // console.log(data);

  //conversión de la respuesta en json
  let products=await response.json();
  console.log(products);

  //impresión del resultado en etiqueta p
  // document.getElementById("Result").innerText=data;
  var container=document.getElementById("container");
    container.innerHTML="";
  //ciclo para mostrar los productos
  products.forEach(product => {

    // //creación de la estructura de la tabla    
    // var register=document.createElement("tr");
    // var cellId=document.createElement("td");
    // var cellTitle=document.createElement("td");
    // var cellPrice=document.createElement("td");

    // //mostrar los datos en las celdas
    // cellId.innerText=product.id;
    // cellTitle.innerText=product.title;
    // cellPrice.innerText=product.price;

    // //estructura para agregar los elementos
    // register.appendChild(cellId);
    // register.appendChild(cellTitle);
    // register.appendChild(cellPrice);
    // container.appendChild(register);
    //separación de la carga de la tabla
  tableLoad(product);
  });
     
    
}

//función para consulta todos los productos 
async function getFindByIdProduct(){
  var id=document.getElementById("idFilter").value
  //cabecera de la petición
  let headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  }
  //petición al servidor
  //fetch("end point del servidor"
  let response = await fetch("http://localhost:3000/products/"+id, { 
    //tipo de petición
    method: "GET",
    //agregar cabecera
    headers: headersList
  });

  //conversión de la respuesta en texto
  // let data = await response.text();
  // console.log(data);

  //conversión de la respuesta en json
  let product=await response.json();
  console.log(product);

  //impresión del resultado en etiqueta p
  // document.getElementById("Result").innerText=data;
      container.innerHTML="";
  tableLoad(product);
}

function tableLoad(product){
//captura del contenedor
  var container=document.getElementById("container");

    
    //creación de la estructura de la tabla    
    var register=document.createElement("tr");
    var cellId=document.createElement("td");
    var cellTitle=document.createElement("td");
    var cellPrice=document.createElement("td");

    //mostrar los datos en las celdas
    cellId.innerText=product.id;
    cellTitle.innerText=product.title;
    cellPrice.innerText=product.price;

    //estructura para agregar los elementos
    register.appendChild(cellId);
    register.appendChild(cellTitle);
    register.appendChild(cellPrice);
    container.appendChild(register);

  
}