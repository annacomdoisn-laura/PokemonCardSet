document.addEventListener('DOMContentLoaded', function () {
    const cardWrappers = document.querySelectorAll('.card-wrapper');


    cardWrappers.forEach(wrapper => {
        const frontCard = wrapper.querySelector('.card-front');
        frontCard.classList.add('animated');
    });

    setTimeout(() => {
        cardWrappers.forEach(wrapper => {
            const frontCard = wrapper.querySelector('.card-front');
            frontCard.classList.remove('animated');
        });
    }, 12000);


    cardWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });


    cardWrappers.forEach(wrapper => {
        wrapper.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;


            let transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            if (this.classList.contains('flipped')) {
                transform += ' rotateY(180deg)';
            }
            this.style.transform = transform;


            const shines = this.querySelectorAll('.shine');
            shines.forEach(shine => {
                const posX = (x / rect.width) * 100;
                const posY = (y / rect.height) * 100;
                shine.style.setProperty('--x', `${posX}%`);
                shine.style.setProperty('--y', `${posY}%`);
            });


            this.querySelectorAll('.card').forEach(card => {
                card.classList.add('active');
            });
        });

        wrapper.addEventListener('mouseleave', function () {

            if (this.classList.contains('flipped')) {
                this.style.transform = 'rotateY(180deg)';
            } else {
                this.style.transform = 'rotateY(0deg)';
            }

            this.querySelectorAll('.card').forEach(card => {
                card.classList.remove('active');
            });
        });
    });
});