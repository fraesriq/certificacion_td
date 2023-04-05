import { Users } from "./Users.model.js";
import { Posts } from "./Posts.model.js";
import { Categories } from "./Categories.model.js";
import { Comments } from "./Comments.model.js";
import { Califications } from "./Califications.model.js";

Users.hasMany(Posts, {
  onDelete: 'CASCADE'
})
Categories.hasMany(Posts)

Posts.belongsTo(Users)
Posts.belongsTo(Categories)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Califications)
Califications.belongsTo(Posts)

Users.hasMany(Califications)
Califications.belongsTo(Users)