/*
  Script created by Nicholas 'Viridian' Nakano.

  Usage note: $.DispatchEvent("ClientUI_FireOutput") and $.DispatchEvent("ClientUI_FireOutputStr") output to their respectively numbered outputs within the Hammer I/O system. (CustomOutput0, CustomOutput1, etc...).
*/

"use strict";

//Entry Registry (An array that will contain all entries.)
var entryRegistry = [];

function MapEntry(name, author, desc, image, map)
{
  this.name = name;
  this.author = author;
  this.image = image;
  this.desc = desc;
  this.map = map;

  entryRegistry.push(this);
  $.Msg("Loaded Entry: " + this.name);
}

function PlaySound()
{
    $.DispatchEvent("ClientUI_FireOutput", 0);
}

function HoverSound()
{
    $.DispatchEvent("ClientUI_FireOutput", 2);
}

function ConfSound()
{
    $.DispatchEvent("ClientUI_FireOutput", 3);
}

var activeMapId;
var activePage = 0;

const mapListPanel = $("#MapList");

function DrawEntries(firstIdToDrawFrom)
{
  mapListPanel.RemoveAndDeleteChildren();
  $.Msg("Cleared Drawn Entries.");
  $.Msg("Displaying Entries: ");
  for (var i = firstIdToDrawFrom; i < firstIdToDrawFrom + 8; i++)
  {
    var newEntryPanel = $.CreatePanel("Panel", mapListPanel, i);
    newEntryPanel.BLoadLayout("file://{resources}/layout/custom_game/vm1map_item.xml", false, false);
    var button = newEntryPanel.GetChild(0);
    var label = button.GetChild(0);
    label.text = entryRegistry[i].name;
    $.Msg(entryRegistry[i].name);
    if (entryRegistry[i + 1] == null)
    {
      $.Msg("Reached end of list.");
      break;
    }
  }
}

function Initialize()
{

let entry1 = new MapEntry("Field Studies", "Nicholas 'Viridian' Nakano", "You, Alyx Vance, are tasked with a mission to destroy a Combine power relay. Aided by the Resistance Handler Russel, you make your way towards the old historic quarter of the city...", "fieldstudies.png", "a1_museum");
let entry2 = new  MapEntry("The Vort Kitchen", "Beauman Edwards", "An environmental experience of xen cooking.", "vortkitchen.png", "vortkitchen1_1b");
let entry3 = new  MapEntry("A Way Through", "Uber_Panzerhund", "Explore the Xen infested service tunnels beneath City 17 as a scout for the underground railroad. Get in, grab supplies, and find a way through.", "awaythrough.png", "vm1_awaythrough01");
let entry4 = new  MapEntry("Xenfestation (Cube)", "CubyChris", "Gman has released you from stasis for a quick little venture to take care of something.", "cubexenfestation.png", "xenfestation_1");
let entry5 = new  MapEntry("Morgue", "JefferyMcBoyo", "After waking up in the head mortician's office of the City 17 morgue, you have to fight your way out through the infected staff and the cleanup crew.", "morgue.png", "vm1_morgue");
let entry6 = new  MapEntry("Xen Voyager", "Neon", "The combine are prototyping their teleportation technology in Xen. You need to stop them, otherwise the rebellion will fall.", "xenvoyager.png", "vm1_xenvoyager");
let entry7 = new  MapEntry("Reaction Diffusion", "Mettle Meek", "Far from City 17, Alyx finds herself climbing what was once the Eiffel Tower to disable a Combine-built machine of unknown purpose.", "reactiondiffusion.png", "reaction_diffusion");
let entry8 = new  MapEntry("Xencrophobe: Infestation Containment", "SoggyMicrowaveNugget", "On a stormy day the Combine deploy an Infestation control team to your block. If you're careful you might live to tell the tale, but be wary, to them you're just another potential infected.", "xencrophobe.png", "vm1_xencrophobe_1");
let entry9 = new  MapEntry("The Bunker", "naughtyrobot", "Fight your way through a collapsing combine vault to uncover ancient underground secrets.", "thebunker.png", "vm1_thebunker");
let entry10 = new  MapEntry("Sewage Disposal", "Daxit", "When a simple visit turns awry.", "daxit.png", "vm1_daxit");
let entry11 = new  MapEntry("Stomps", "chrjen", "A massive beast has been spotted nearby. Be careful.", "stomp.png", "stomp");
let entry12 = new  MapEntry("Dirty Deeds", "piqey", "When tasked with a unique plumbing job, Alyx finds herself in many different miniature Xen ecosystems, all of them out to get her.", "dirtydeeds.png", "vm1_dirtydeeds");
let entry13 = new  MapEntry("What Cat?", "softest rodvt", "Stranded in a Combine off-world facility, few clues remain amidst the flesh and spores.", "whatcat.png", "vm1_what_cat");
let entry14 = new  MapEntry("Necrotics", "Photino1", "Fight your way through underground corridors in search of a working elevator. A combine zombie... that's like, a Zombine, right?", "necrotics.png", "vm1_necrotics");
let entry15 = new  MapEntry("Septic Trouble", "Julian Heuser", "Enter a sewer infested with xen life, in an attempt to infiltrate a remote combine base.", "septictrouble.png", "vm1_septictrouble");
let entry16 = new  MapEntry("Metropolis Infestation", "Sox", "Deep within the Quarantine Zone, a super intelligent Xen species has seized control over a Combine outpost containing a weapon of mass destruction. You are tasked with clearing the infestation and deactivating the weapon.", "metropolisinfestation.png", "mv1_metropolis_infestation");
//let entry17 = new  MapEntry("Xortal", "moist fellow", "Explore the ruins of the Black Mesa Research Facility, which has just opened a portal to a new world.", "xortal.png", "vm1_xortal");
let entry17 = new MapEntry("Cave Exploration", "ImDrinkingCoca", "Explore a Xen infested cave in order to find a secret Combine research facility.", "caveexploration.png", "vm1_caveexploration_1");
let entry18 = new MapEntry("Infestation Cleaning", "Adesi", "Can you stop his arrival and free the world from his reign once more?", "infestationcleanup.png", "vm1_cleaninginfestation");
let entry19 = new MapEntry("Repellant", "Bear", "The repellant that the Combine are using has proven ineffective; they have discovered an organism on Xen that produces 100% effective repellant. Find the organism, and destroy it.", "repellant.png", "vm1_repellant");

  $.RegisterForUnhandledEvent("Activated", function(panel)
  {
    var selectedID = panel.GetParent().id;
    $.Msg(selectedID);
    FetchEntryData(selectedID);
  });
  DrawEntries(0);
  activePage = 0;
  $("#NextPageButton").GetChild(0).text = ">";
  $("#BackPageButton").GetChild(0).text = "<";
  $("#NextPageButton").visible = true;
  $("#BackPageButton").visible = false;
}

function FetchEntryData(id)
{
  ConfSound();
  $("#bkgd-image").visible = false;
  $("#bkgd-text").visible = false;
  $("#TitleBox").text = ("Title: " + entryRegistry[id].name).toUpperCase();
  $("#AuthorBox").text = ("Author: " + entryRegistry[id].author).toUpperCase();
  $("#DescriptionBox").text = ("Description: " + entryRegistry[id].desc).toUpperCase();
  $("#ThumbnailImage").SetImage("file://{resources}/images/custom_game/" + entryRegistry[id].image);
  activeMapId = id;
}

function CreditsShow()
{
  PlaySound();
  $("#wrapperID").visible = !$("#wrapperID").visible;
  $("#CreditsButtonID").visible = true;
  $("#CreditsWrapperID").visible = !$("#CreditsWrapperID").visible;
}

function SetMap()
{
  PlaySound();
  $.DispatchEvent("ClientUI_FireOutputStr", 1, "addon_play " + entryRegistry[activeMapId].map);
}

function NextPage()
{
  PlaySound();
  switch(activePage)
  {
    case 0:
      DrawEntries(8);
      activePage = 1;
      $("#NextPageButton").visible = true;
      $("#BackPageButton").visible = true;
      break;
    case 1:
      DrawEntries(16);
      activePage = 2;
      $("#NextPageButton").visible = false;
      $("#BackPageButton").visible = true;
      break;
  }
}

function BackPage()
{
  PlaySound();
  switch(activePage)
  {
    case 1:
      DrawEntries(0);
      activePage = 0;
      $("#NextPageButton").visible = true;
      $("#BackPageButton").visible = false;
      break;
    case 2:
      DrawEntries(8);
      activePage = 1;
      $("#NextPageButton").visible = true;
      $("#BackPageButton").visible = true;
      break;
  }
}

// Main Code
(function()
{
  $.Msg("Loaded!");
  Initialize();
})();
