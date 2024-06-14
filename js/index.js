// 배너 슬라이드
$(document).ready(function() {
    let currentIndex = 0;
    const slides = $('.banner-slide');
    const slideCount = slides.length;

    function showSlide(index) {
        slides.hide();
        slides.eq(index).show();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 3000); // 3초마다 슬라이드 전환
});

// 픽 사연 슬라이드
$(document).ready(function() {
    const $prevSlideButton = $('.prev-slide');
    const $nextSlideButton = $('.next-slide');
    const $cardContainer = $('.card-container');
    const cardWidth = $('.card').outerWidth(true); // Get the width of a single card including margin

    function updateButtons() {
        const scrollLeft = $cardContainer.scrollLeft();
        const maxScrollLeft = $cardContainer[0].scrollWidth - $cardContainer[0].clientWidth;

        if (scrollLeft <= 0) {
            $prevSlideButton.addClass('hidden');
        } else {
            $prevSlideButton.removeClass('hidden');
        }

        if (scrollLeft >= maxScrollLeft) {
            $nextSlideButton.addClass('hidden');
        } else {
            $nextSlideButton.removeClass('hidden');
        }
    }

    $prevSlideButton.on('click', function() {
        $cardContainer.stop().animate({
            scrollLeft: '-=' + cardWidth
        }, 300, updateButtons);
    });

    $nextSlideButton.on('click', function() {
        $cardContainer.stop().animate({
            scrollLeft: '+=' + cardWidth
        }, 300, updateButtons);
    });

    $cardContainer.on('scroll', updateButtons);

    // Initial button state
    updateButtons();
});

// 나한테 맞는 전문가 슬라이드
$(document).ready(function() {
    const $nextSlideButton = $('.next-slide');
    const $cardContainer = $('.card-container');
    const cardWidth = $('.card').outerWidth(true); // Get the width of a single card including margin

    // Clone the first and last cards for infinite scrolling effect
    $('.card').first().before($('.card').last().clone());
    $('.card').last().after($('.card').first().clone());

    $cardContainer.scrollLeft(cardWidth); // Set initial scroll position

    $nextSlideButton.on('click', function() {
        $cardContainer.stop().animate({
            scrollLeft: '+=' + cardWidth
        }, 0, function() {
            if ($cardContainer.scrollLeft() >= ($cardContainer[0].scrollWidth - cardWidth * 3)) {
                $cardContainer.scrollLeft(cardWidth);
            }
        });
    });

    $cardContainer.on('scroll', function() {
        if ($cardContainer.scrollLeft() <= 0) {
            $cardContainer.scrollLeft($cardContainer[0].scrollWidth - cardWidth * 4);
        } else if ($cardContainer.scrollLeft() >= ($cardContainer[0].scrollWidth - cardWidth * 3)) {
            $cardContainer.scrollLeft(cardWidth);
        }
    });
});