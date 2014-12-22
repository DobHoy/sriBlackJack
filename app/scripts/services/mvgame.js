'use strict';

/**
 * @ngdoc service
 * @name sritry1App.mvGame
 * @description
 * # mvGame
 * Factory in the sritry1App.
 */
angular.module('sritry1App')
  .factory('mvGame', function (mvCard, mvDealer) {


    return { 
      DealSingleCard: function(playerState){
      
        var randomCard = mvCard.returnRightCard();
        
        playerState.Cards.push(randomCard);
      
        var pointsToAdd = mvCard.getScore(randomCard.rank);

        playerState.Score += pointsToAdd;

      }, 
      Deal: function(playerState){
        this.DealSingleCard(playerState);
        this.DealSingleCard(playerState);
      }, 
      gameStart: function(gameState){
        // console.log('i got called');

        // $(".playing-card").remove();
          


        //   gameState.playerReady = true;
        //   gameState.gameinProgress = true;

        //   gameState.player = {Score:0, Cards:[]};
        //   gameState.dealer = {Score:0, Cards:[]};
          
      }, 
      isGameOver: function(gameState){
        var statusOfGame = mvDealer.checkGameStateBJ(gameState);



            if (statusOfGame >= 0 )
            {
              mvDealer.alertStatus(statusOfGame);
              // $scope.gameStart();
              this.gameStart(gameState);
            }
            return statusOfGame;
      }, 
      dealersTurn: function(gameState){
        var dealerScore = gameState.dealer.Score;

        if(dealerScore < 17)
        {
          //if dealer has less than 17, he must hit

          this.DealSingleCard(gameState.dealer);
          //bust, ,blackjack or stay
          dealerScore = gameState.dealer.Score;
          if(dealerScore > 21)
          {
            //you won!
            swal("Player won!", "Dealer busted!", "success");
            return 1;
          }
          else if(dealerScore === 21){
            //dealerbackjack
            swal("Dealer won!", "Dealer balackjack!", "success");
            return 2;
          }
          else {
            return -1; //game continues
          }

        }


      }




    };
  });