// app/api/localidades/[id]/route.js
import { NextResponse } from 'next/server';
import LocalidadModel from '../../../../models/localidadModel';


// Petición PUT: Actualiza una localidad específica (UPDATE)
export async function PUT(request, { params }) {
    try {
      // 1. Extraemos el ID dinámico de la URL usando 'await' (como hicimos en el DELETE)
      const { id } = await params;
     
      // 2. Extraemos los nuevos datos enviados por la Vista (el cuerpo de la petición)
      const { Cod_Localidad, Localidad } = await request.json();
 
      // 3. Llamamos al Modelo para que ejecute la consulta SQL de actualización
      await LocalidadModel.update(id, Cod_Localidad, Localidad);
 
      // 4. Devolvemos respuesta de éxito
      return NextResponse.json(
        { message: 'Registro actualizado con éxito' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Error al intentar actualizar el registro' },
        { status: 500 }
      );
    }
  }


// Petición DELETE: Borra una localidad específica (DELETE)
export async function DELETE(request, { params }) {
    try {
      // 1. Extraemos el ID dinámico de la URL (el valor capturado por la carpeta [id])
      const { id } = await params;
 
      // 2. Llamamos al Modelo para que ejecute la consulta SQL de borrado en Railway
      await LocalidadModel.delete(id);
 
      // 3. Devolvemos una respuesta de éxito en formato JSON al Frontend
      return NextResponse.json(
        { message: 'Registro borrado con éxito' },
        { status: 200 }
      );
    } catch (error) {
      // 4. Si la consulta a la base de datos falla, capturamos el error
      // y enviamos un estado 500 para que la Vista sepa que hubo un problema
      return NextResponse.json(
        { error: 'Error al intentar borrar el registro' },
        { status: 500 }
      );
    }
  }
