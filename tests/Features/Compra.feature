# language: es
Característica: Flujo de compras en Sauce Demo
  Como usuario de la tienda
  Quiero poder agregar productos al carrito y realizar el checkout
  Para adquirir los productos que necesito

  Antecedentes:
    Dado que el usuario navega a la pagina de Sauce Demo
    Y el usuario inicia sesion con credenciales validas

  Escenario: Realizar la compra exitosa de un producto
    Cuando el usuario elige un producto
    Y va al carrito de compras
    Y realiza el checkout con sus datos validos
    Entonces el sistema muestra el mensaje de exito "Thank you for your order!"

  Escenario: Realizar la compra de varios productos exitosa
    Cuando el usuario elige multiples productos
    Y va al carrito de compras
    Y realiza el checkout con sus datos validos
    Entonces el sistema muestra el mensaje de exito "Thank you for your order!"

  Escenario: Realizar checkout sin eleccion de productos
    Cuando va al carrito de compras
    Y realiza el checkout con sus datos validos
    Entonces el sistema muestra el mensaje de exito "Thank you for your order!"

  Esquema del escenario: Validar errores en el checkout por campos incompletos
    Cuando el usuario elige un producto
    Y va al carrito de compras
    Y el usuario inicia el checkout
    Y llena la informacion con nombre "<nombre>", apellido "<apellido>" y codigo "<codigo>"
    Y continua con el checkout
    Entonces el sistema muestra el mensaje de error "<mensaje_error>"

    Ejemplos:
      | nombre      | apellido        | codigo | mensaje_error                  |
      |             | Rios Chumbiauca | 15066  | Error: First Name is required  |
      | Luis Carlos |                 | 15066  | Error: Last Name is required   |
      | Luis Carlos | Rios Chumbiauca |        | Error: Postal Code is required |
