export const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: {duration: 0.1, delay: 0.2}
    },
}

export const slideUp = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1}
    }
}

export const bottomUp = {
    initial: {
        top: "100vh"
    },
    exit: {
        top: 0,
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1}
    }
}

export const expand = {

    initial: {
        top: 0
    },
    enter: (i: number) => ({    
        top: "100vh",
        transition: {
            duration: 0.7,
            delay: 0.05 * i,
            ease: [0.85, 0, 0.15, 1],
        },
        transitionEnd: { height: "0", top: "0" }
    }),
    exit: (i: number) => ({
        height: "100vh",
        transition: {
            duration: 0.7,
            delay: 0.05 * i,
            ease: [0.85, 0, 0.15, 1]
        }

    })

}