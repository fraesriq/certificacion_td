import { Categories } from '../models/Categories.model.js';
import { Posts } from '../models/Posts.model.js';
import { Comments } from '../models/Comments.model.js';
import { Users } from '../models/Users.model.js';
import { sequelize } from '../db/db.js';
import { Califications } from '../models/Califications.model.js'

export const controllerHome = async (req, res) => {

  let categories = await Categories.findAll({
    raw: true,
    attributes: ['id','name'],
    order: [
      ['name','ASC']
    ]
  })

  let posts = await Posts.findAll({    
    order: [
      ['title','ASC']
    ],
    include: [
      {model:Users},
      {model:Categories}
    ]
  })
    
  res.render('home', {
    categories,
    posts
  })
}

export const controllerFilterPost = async (req, res) => {

  try {
    let { id } = req.params;

    let categories = await Categories.findAll({
      raw: true,
      attributes: ['id','name'],
      order: [
        ['name','ASC']
      ]
    })

    let posts = await Posts.findAll({    
    where: [{categoryId:id}],
    order: [
      ['title','ASC']
    ],
    include: [
      {model:Users},
      {model:Categories}
    ]
  })

    res.render('home', {
      categories,
      posts
    })
    
  } catch (error) {
    
  }
}

export const controllerPublicar = async (req, res) => {

  try {

    let user = req.user;

    let categories = await Categories.findAll({
      raw: true,
      attributes: ['id','name'],
      order: [
        ['name','ASC']
      ]
    });    

    res.render('publicar', {
      user,
      categories
    })

  } catch (error) {
    console.log(error);
    res.render('publicar',{
      error: "Se ha generado un error al cargar la vista"
    })
  }
  
}

export const controllerContacto = async (req, res) => {
  
  let categories = await Categories.findAll({
    raw: true,
    attributes: ['id','name'],
    order: [
      ['name','ASC']
    ]
  })

  res.render('contacto',{
    categories
  })
}

export const controllerShowPost = async (req, res) => {
  
  try {
    let { id } = req.params;
    console.log('params:',req.params);
    let categories = await Categories.findAll({
      raw: true,
      attributes: ['id','name'],
      order: [
        ['name','ASC']
      ]
    })

    let post = await Posts.findOne({
      where: {
        id
      },
      include: [
        {model:Users},
        {model:Categories},
        {
          model: Comments,
          include: [Users],
          attributes: [
            'id',
            'content',
            [sequelize.literal("to_char(date, 'DD-MM-YYYY')"), 'date']
          ]
        }
      ],
      attributes: [
        'id',
        'title',
        'content',
        [sequelize.literal("to_char(date_post, 'DD-MM-YYYY')"), 'date_post'],
        'imagen'  
      ]
    })  
    
    let usersCalifications = await Califications.findAll({
      where: {
        postId: id,
        type: 1
      },
      include: [
        {
          model: Users,
          attributes: ['name']
        }
      ]
    })

    console.log('usersCalifications: ',usersCalifications);

    if (post == null) throw new Error("No se encuentra el post seleccionado")
    
    let likes = await Califications.count({
      where: {
        postId: id,
        type:1
      }
    })
    
    let dislikes = await Califications.count({
      where: {
        postId: id,
        type:0
      }
    })

    let users_like = usersCalifications;

    res.render('detail', {    
      users_like,  
      likes,
      dislikes,
      categories,
      post,
      comments: post.dataValues.comments
    })

    
  } catch (error) {
    console.log('error',error);
  }
}
