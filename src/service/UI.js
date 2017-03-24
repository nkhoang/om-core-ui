'use strict';

class UI {
  constructor(coreLibs) {
    let _ = coreLibs._
      , $ = coreLibs.$
      , Spinner = coreLibs.Spinner
      , swal = coreLibs.swal
      , toastr = coreLibs.toastr
      , ui = {};

    /**
     * Blocks UI and shows spinner using $.blockUI and spin.js
     * API: block, unblock
     */
    let isBlocking = false;
    let spinner = new Spinner({
      lines: 10,       // The number of lines to draw
      length: 5,        // The length of each line
      width: 3,        // The line thickness
      radius: 5,        // The radius of the inner circle
      rotate: 0,        // Rotation offset
      corners: 1,        // Roundness (0..1)
      color: '#000',   // #rgb or #rrggbb
      direction: 1,        // 1: clockwise, -1: counterclockwise
      speed: 1.25,     // Rounds per second
      trail: 75,       // Afterglow percentage
      opacity: 0.25,     // Opacity of the lines
      zIndex: 10001,    // Use a high z-index by default
      className: 'spinner' // CSS class to assign to the element
    });

    $.extend($.blockUI.defaults, {
      message: ' ',
      baseZ: 9999999,
      fadeIn: 0,
      fadeOut: 0,
      blockMsgClass: 'blocked',

      css: {
        padding: 0,
        top: '50%',
        left: '50%',
        width: '40px',
        height: '40px',
        marginLeft: '-20px',
        marginTop: '-20px',
        textAlign: 'center',
        border: 'none',
        borderRadius: '4px',
        cursor: 'wait',
        color: '#000',
        backgroundColor: '#fff'
      },

      onBlock: function () {
        if (isBlocking) return;
        isBlocking = true;
        let $blockOverlay = $('.blockUI.blockOverlay').not('.has-spinner');
        let $blockMsg = $blockOverlay.next('.blocked');
        $blockOverlay.addClass('has-spinner');
        spinner.spin($blockMsg.get(0));
      },

      onUnblock: function () {
        if (!isBlocking) return;
        isBlocking = false;
        spinner.stop();
      }
    });

    _.forEach(['block', 'unblock'], function (method) {
      ui[method] = function () {
        $[method + 'UI']();
      };
    });

    ui.checkJSON = function (json) {
      try {
        JSON.parse(json);
      } catch (exception) {
        return false;
      }
      return true;
    };

    /**
     * Shows alert and confirm dialog using bootstrap-sweetalert
     * API: alert, confirm
     * Remark: check out all options here http://tristanedwards.me/sweetalert
     */
    ui.alert = function (opts) {
      opts.type = opts.type || 'error';
      swal(opts);
    };

    ui.confirm = function (opts, cb) {
      opts.type = opts.type || 'info';
      opts.showCancelButton = true;
      swal(opts, cb || _.noop());
    };

    /**
     * Displays notification using toastr
     * API: error, info, success, warning
     * Remark: pass an array to show multiple messages
     */
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-top-right';
    ['error', 'info', 'success', 'warning'].forEach(function (method) {
      ui[method] = function (msg) {
        if (!_.isArray(msg)) {
          msg = [msg];
        }
        _.forEach(msg, function (msg) {
          toastr[method](msg);
        });
      };
    });

    return ui;
  }

  static UIFactory(coreLibs) {
    'ngInject';
    return new UI(coreLibs);
  }
}

export default UI;
