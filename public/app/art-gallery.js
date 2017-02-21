// console.log("HelloFromArtGalleryJavascript");

// Modal functions below**

/* copy loaded thumbnails into carousel */
// $('.row .thumbnail').on('load', function() {
//
// }).each(function(i) {
//     if(this.complete) {
//         var item = $('<div class="item"></div>');
//         var itemDiv = $(this).parents('div');
//         var title = $(this).parent('a').attr("title");
//
//         item.attr("title",title);
//         $(itemDiv.html()).appendTo(item);
//         item.appendTo('.carousel-inner');
//         if (i==0){ // set first item active
//             item.addClass('active');
//         }
//     }
// });
//
// /* activate the carousel */
// $('#modalCarousel').carousel({interval:false});
//
// /* change modal title when slide changes */
// $('#modalCarousel').on('slid.bs.carousel', function () {
//     $('.modal-title').html($(this).find('.active').attr("title"));
// })
//
// /* when clicking a thumbnail */
// $('.row .thumbnail').click(function(){
//     var idx = $(this).parents('div').index();
//     var id = parseInt(idx);
//     $('#myModal').modal('show'); // show the modal
//     $('#modalCarousel').carousel(id); // slide carousel to selected
//
// });
//



// $(document).ready(function() {
//     $('.thumbnail').click(function(){
//         $('.modal-body').empty();
//         var title = $(this).parent('a').attr("title");
//         $('.modal-title').html(title);
//         $($(this).parents('div').html()).appendTo('.modal-body');
//         $('#myModal').modal({show:true});
//     });
// });
//
// // Next and previous button functions below
//
// $("div[id^='myModal']").each(function(){
//
//     var currentModal = $(this);
//
//     //click next
//     currentModal.find('.btn-next').click(function(){
//         currentModal.modal('hide');
//         currentModal.closest("div[id^='myModal']").nextAll("div[id^='myModal']").first().modal('show');
//     });
//
//     //click prev
//     currentModal.find('.btn-prev').click(function(){
//         currentModal.modal('hide');
//         currentModal.closest("div[id^='myModal']").prevAll("div[id^='myModal']").first().modal('show');
//     });
//
// });


