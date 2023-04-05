import { Posts } from '../models/Posts.model.js'
import { Comments } from '../models/Comments.model.js'
import fs from 'fs';
import path from 'path';
import { Califications } from '../models/Califications.model.js';

export const addPost = async (req, res) => { 
  
  try {
    let { postTitle, postCategoria, postContent } = req.body    
    
    if (postTitle == undefined | postCategoria == undefined | postContent == undefined) {
      fs.unlinkSync(path.resolve("../public/img" + req.body.foto));
      return res.status(400).json({code: 400, message: "Debe entregar toda la informacion requerida."})
    } else {
      
      let objPost = {
        title :postTitle,
        content:postContent,      
        imagen:req.imagen,
        userId:req.user.id,
        categoryId:postCategoria,
      }
      
      let post = await Posts.create(objPost);
      
      if (post === null) throw new Error('No se logro guardar la publicacion');

      res.status(201).json({ code: 201, message: "Publicado correctamente." })
    }

  } catch (error) {
    console.log('error al crear publicacion: ', error);
    res.status(400).json({code: 400, message: error})
  }
}

export const addComment = async (req, res) => {  
  
  try {
    let { comment_post, id_post } = req.body;
    let userId = req.user.id;
    
    if (comment_post == undefined | id_post == undefined | userId == undefined) {    
      return res.status(400).json({code: 400, message: "Debe entregar toda la informacion requerida."})
    }  

    let objComment = {        
      content: comment_post,      
      userId:userId,
      postId:id_post,
    }

    let comment = await Comments.create(objComment)

    if (comment === null) throw new Error('No se logro guardar el comentario');
    
    res.status(201).json({ code: 201, message: "Comentario agregado correctamente." })

  } catch (error) {
    console.log('error al crear publicacion: ', error);
    res.status(400).json({code: 400, message: error})

  }
  

}

export const addLike = async (req, res) => {
    
  try {
    let { id_post } = req.body;
    let userId = req.user.id;
    
    let findCalification = await Califications.count({
      where: {
        userId: userId,
        postId: id_post,
        type:1
      }
    })

    if(findCalification) return res.status(400).json({ code: 400, message: "Ya califico positivamente esta publicación." });
    
    let objLike = {        
      type: 1,      
      postId:id_post,
      userId:userId,
    }

    let like = await Califications.create(objLike)

    if (like === null) throw new Error('No se logro guardar la calificación');
    
    res.status(201).json({ code: 201, message: "Calificación agregada correctamente." })

  } catch (error) {
    console.log('error al crear la calificacion: ', error);
    res.status(400).json({code: 400, message: error})
  }
}

export const addDisLike = async (req, res) => {
    
  try {
    let { id_post } = req.body;
    let userId = req.user.id;
    
    let findCalification = await Califications.count({
      where: {
        userId: userId,
        postId: id_post,
        type:0
      }
    })

    if(findCalification) return res.status(400).json({ code: 400, message: "Ya califico negativamente esta publicación." });
    
    let objLike = {        
      type: 0,      
      postId:id_post,
      userId:userId,
    }

    let like = await Califications.create(objLike)

    if (like === null) throw new Error('No se logro guardar la calificación');
    
    res.status(201).json({ code: 201, message: "Lamentamos su calificación." })

  } catch (error) {
    console.log('error al crear la calificacion: ', error);
    res.status(400).json({code: 400, message: error})
  }
}