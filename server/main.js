import { Meteor } from 'meteor/meteor';
import { Cards } from '../both/collections'
import mtg from "mtgsdk";
import "./loadImage.js"

const bound = Meteor.bindEnvironment(cb => cb());
const limit =  { limit: 20 };
const queryFrom = s => ({ name: { $regex: new RegExp(s, "i") }})
const search = (search) => Cards.find(queryFrom(search), limit);

Meteor.publish("cardSearch", search)

const insertCard = card => {
  const { number = "", imageUrl = "" } = card;
  bound(() => {
    if(!(!number.includes('★') && imageUrl.includes('h'))) return
    Cards.insert(card)
    console.log(card.name)
  });
}

const startup = () => {
  if (Cards.find().count() > 0) return;
  mtg.card.all().on('data', insertCard);
}

Meteor.startup(startup);
