(function () {
  "use strict";

  // 构造一个记事本
  function Notepad() {
    var version = " Ver 0.02";
    var appStroage = new AppStorage("notepad");
    loadNote();
    // 创建新笔记
    function addNote() {
      var noteTitle = $("#new-note-title").val();
      addNoteElement(noteTitle);
      $("#new-note-title").val("").focus();
      saveNote();
    }

    function addNoteElement(noteTitle, noteContent) {
      if (noteTitle) {
        var $noteArticle = $("#template .note-article").clone();
        $("#note-list").append($noteArticle);
        $(".note-title", $noteArticle).text(noteTitle);
        $(".note-content", $noteArticle).text(noteContent);
        $(".delete", $noteArticle).click(function () {
          $noteArticle.remove();
          saveNote();
        });
        // 笔记标题可更改
        $(".note-title", $noteArticle).click(function () {
          editNoteTitle($(this));
        });
        // 更改后更新标题
        $("input.edit-note-title", $noteArticle).on("change focusout", function () {
          changeNoteTitle($(this));
          saveNote();
        });
        // 编辑正文
        $(".add-content", $noteArticle).click(function () {
          editContent($(this));
        });
        // 编辑后更新正文
        $("textarea.edit-content", $noteArticle).on("focusout", function () {
          changeNoteContent($(this));
          saveNote();
        });
      }
    }
    // 可编辑笔记标题
    function editNoteTitle($noteTitle) {
      $noteTitle.hide().siblings("input.edit-note-title")
        .val($noteTitle.text()).show().focus();
    }
    // 更改后更新标题
    function changeNoteTitle($input) {
      $input.hide();
      var $noteTitle = $input.siblings(".note-title");
      if ($input.val()) {
        $noteTitle.text($input.val());
      }
      $noteTitle.show();
    }
    // 编辑正文
    function editContent($add) {
      var $editContent = $add.parent().siblings("textarea.edit-content");
      var $noteContent = $add.parent().siblings("p.note-content");
      $noteContent.hide();
      $editContent.val($noteContent.text()).show().focus();
    }
    // 编辑后更新正文
    function changeNoteContent($input) {
      $input.hide();
      var $noteContent = $input.siblings("p.note-content");
      $noteContent.text($input.val());
      $noteContent.show();
    }
    // 本地储存支持
    function saveNote() {
      var noteTitles = {};
      $("#note-list .note-article .note-title").each(function () {
        noteTitles[$(this).text()] = 
          $(this).parent().parent().siblings("p.note-content").text();
      });
      appStroage.setValue("noteTitles", noteTitles);
    }

    function loadNote() {
      var noteTitles = appStroage.getValue("noteTitles");
      if (noteTitles) {
        for (var i in noteTitles) {
          addNoteElement(i, noteTitles[i]);
        }
      }
    }
    // 开始接口
    this.start = function () {
      $("#new-note-title").keypress(function (e) {
        if (e.which == 13) {
          addNote();
          return false;
        }
      });
    };
    $("header>h1").append(version);
  }

  //开始主程序
  (function () {
    var app = new Notepad();
    app.start();
  })();

})();