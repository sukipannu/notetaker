//const { get, render } = require("../../../../server");

var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");
var activeNote = {};

//Get notes from db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes" ,
        method: "GET"
    });
};

//Save notes to db
var saveNote = function(note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

//BONUS delete note
var deleteNote = function(id) {
    return $.ajax({
        url: "api/notes/" + id, 
        method: "DELETE"
    });
};

//Display notes
var renderActiveNote = function() {
    $saveNoteBtn.hide();

    if (activeNote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.title);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};

//get notes data from input
var handleNoteSave = function() {
    var newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };

    saveNote(newNote).then(function(data) {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//delete current note
var handleNoteDelete = function(event) {
    event.stopPropagation();

    var note = $(this)
    .parent(".list-group-item")
    .data();

    if (activeNote.id === note.id) {
        activeNote = {};
    }

    deleteNote(note.id).then(function() {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//display current note
var handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
};

var handleNewNoteView = function () {
    activeNote = {};
    renderActiveNote();
};

// show save button
var handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
};

// render note title
var renderNoteList = function(notes) {
    $noteList.empty();

    var noteListItems = [];

    for (var i= 0; i < notes.length; i++) {
        var note = notes[i];

        var $li = $("<li class='list-group-item'>").data(note);
        var $span =$("<span>").text(note.title);
        var $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");

        $li.append($span, $delBtn);
        noteListItems.push($li);
    }

    $noteList.append(noteListItems);
};

var getAndRenderNotes = function() {
    return getNotes().then(function(data) {
        renderNoteList(data);
    });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", "delte-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();