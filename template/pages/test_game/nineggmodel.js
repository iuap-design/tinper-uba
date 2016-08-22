define([ 'jquery', 'knockout', 'text!pages/test_game/nineggmodel.html','css!pages/test_game/nineggmodel.css','uui', 'biz' ], function($, ko, template) {
    var init = function(id, viewSpace) {                
         var viewModel = {
          NgginitJdbc : new $.DataTable({
                meta : {
                     'nggid' : {
                          
                      },
                     'nggname' : {
                          
                      },
                     'nggcode' : {
                          
                      },
                     'ngg11' : {
                          
                      },
                     'ngg12' : {
                          
                      },
                     'ngg13' : {
                          
                      },
                     'ngg14' : {
                          
                      },
                     'ngg15' : {
                          
                      },
                     'ngg16' : {
                          
                      },
                     'ngg17' : {
                          
                      },
                     'ngg18' : {
                          
                      },
                     'ngg19' : {
                          
                      },
                     'ngg21' : {
                          
                      },
                     'ngg28' : {
                          
                      },
                     'ngg27' : {
                          
                      },
                     'ngg26' : {
                          
                      },
                     'ngg25' : {
                          
                      },
                     'ngg24' : {
                          
                      },
                     'ngg23' : {
                          
                      },
                     'ngg22' : {
                          
                      },
                     'ngg29' : {
                          
                      },
                     'ngg31' : {
                          
                      },
                     'ngg38' : {
                          
                      },
                     'ngg37' : {
                          
                      },
                     'ngg36' : {
                          
                      },
                     'ngg35' : {
                          
                      },
                     'ngg34' : {
                          
                      },
                     'ngg33' : {
                          
                      },
                     'ngg32' : {
                          
                      },
                     'ngg39' : {
                          
                      },
                     'ngg41' : {
                          
                      },
                     'ngg48' : {
                          
                      },
                     'ngg47' : {
                          
                      },
                     'ngg46' : {
                          
                      },
                     'ngg45' : {
                          
                      },
                     'ngg44' : {
                          
                      },
                     'ngg43' : {
                          
                      },
                     'ngg42' : {
                          
                      },
                     'ngg49' : {
                          
                      },
                     'ngg51' : {
                          
                      },
                     'ngg58' : {
                          
                      },
                     'ngg57' : {
                          
                      },
                     'ngg56' : {
                          
                      },
                     'ngg55' : {
                          
                      },
                     'ngg54' : {
                          
                      },
                     'ngg53' : {
                          
                      },
                     'ngg52' : {
                          
                      },
                     'ngg59' : {
                          
                      },
                     'ngg61' : {
                          
                      },
                     'ngg68' : {
                          
                      },
                     'ngg67' : {
                          
                      },
                     'ngg66' : {
                          
                      },
                     'ngg65' : {
                          
                      },
                     'ngg64' : {
                          
                      },
                     'ngg63' : {
                          
                      },
                     'ngg62' : {
                          
                      },
                     'ngg69' : {
                          
                      },
                     'ngg71' : {
                          
                      },
                     'ngg79' : {
                          
                      },
                     'ngg78' : {
                          
                      },
                     'ngg77' : {
                          
                      },
                     'ngg76' : {
                          
                      },
                     'ngg75' : {
                          
                      },
                     'ngg74' : {
                          
                      },
                     'ngg73' : {
                          
                      },
                     'ngg72' : {
                          
                      },
                     'ngg81' : {
                          
                      },
                     'ngg89' : {
                          
                      },
                     'ngg88' : {
                          
                      },
                     'ngg87' : {
                          
                      },
                     'ngg86' : {
                          
                      },
                     'ngg85' : {
                          
                      },
                     'ngg84' : {
                          
                      },
                     'ngg83' : {
                          
                      },
                     'ngg82' : {
                          
                      },
                     'ngg91' : {
                          
                      },
                     'ngg99' : {
                          
                      },
                     'ngg98' : {
                          
                      },
                     'ngg97' : {
                          
                      },
                     'ngg96' : {
                          
                      },
                     'ngg95' : {
                          
                      },
                     'ngg94' : {
                          
                      },
                     'ngg93' : {
                          
                      },
                     'ngg92' : {
                          
                      }

                },
                params : {
                     cls : 'com.yonyou.iuap.example.entity.NgginitJdbc'
                }
           })
      }
      var app = $.createApp()
      app.init(viewModel, viewSpace)
    }
    return {
            'template' : template,
            'init' : init
    };
})


