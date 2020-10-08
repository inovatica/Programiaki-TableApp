$(document).ready(function() {


    var animationDuration = 1050; //ms  1000 to za mało, gdyż czasami program wywala błędy, więc 1050

    //flags
    var backWindowDisplay = false;

    //$('.absoluteElements__backButton').on('click', animate());

    $('#backbutton').on('click', function() {
        if (backWindowDisplay === false) {
            $('.backWindow').removeClass('no-disp');
            backWindowDisplay = true;
        } else {
            $('.backWindow').addClass('no-disp');
            backWindowDisplay = false;
        }
    });

    $('.nextMoveButton').on('click', function() {
        service.getDataFromTable().then(function(dataFromTable) {
          service.sendEventToSocket(JSON.stringify({eventName:'listMoves', data:dataFromTable}));
            var data = service.nextMove(dataFromTable);
            var setTime = function(i) {
                setTimeout(function() {
                  service.sendEventToSocket(JSON.stringify({eventName:'nextMove', data:dataFromTable}));
                    view.animateMove(data[i].call(service.map));
                    service.advice();
                    service.whatPlace();
                    //TODO: najprawdopodobniej trzeba będzie zrobić warunek dla advice i whatPlace bo się pochrzanią - sprawdzić
                    $('.message').text(service.advice());
                    if (i-1 == length) {
                      service.clearTable();
                      service.giveMeSocket().send(JSON.stringify(({task: 'last_state'})));
                    }
                }, animationDuration * (i + 1));
            };
            for (var i = 0; i < data.length; i++) {
                setTime(i);
            }
        });
    });

});
