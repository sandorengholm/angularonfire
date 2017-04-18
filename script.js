var app = angular.module('fireApp', ['firebase']);

app.config(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDlqgcLrO4zTYtPP3XqG71GBr-nnFkcK_M",
        authDomain: "practice2-f25e1.firebaseapp.com",
        databaseURL: "https://practice2-f25e1.firebaseio.com",
        projectId: "practice2-f25e1",
        storageBucket: "practice2-f25e1.appspot.com",
        messagingSenderId: "119519911553"
    };
    firebase.initializeApp(config);
});

app.controller('fireController', function($firebaseArray, $firebaseObject){
    var $ctrl = this;

    //Messages object & array
    var ref = firebase.database().ref('messages');
    $ctrl.messagesArr = $firebaseArray(ref);
    $ctrl.messagesObj = $firebaseObject(ref);

    //Write a message
    $ctrl.writeMessage = function(message){
        $ctrl.messagesArr.$add({ text: message })
            .catch(function(){
                alert("Message must not exceed " + $ctrl.settings.maxlength + " characters!");
        });
        $ctrl.currentMessage = "";
    };
    //Delete message
    $ctrl.deleteMessage = function(message){
        $ctrl.messagesArr.$remove(message);
    };  

    //Settings object
    ref = firebase.database().ref('settings');
    $ctrl.settings = $firebaseObject(ref);
});