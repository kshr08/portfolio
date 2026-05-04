import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import gsap from 'gsap';

/* ─── Card shell ─────────────────────────────────────────────────── */
export const Card = forwardRef(({ customClass, style, children, ...rest }, ref) => (
    <div
        ref={ref}
        {...rest}
        className={`${customClass ?? ''} ${rest.className ?? ''}`.trim()}
        style={{
            position: 'absolute',
            borderRadius: 14,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            overflow: 'hidden',
            ...style,
        }}
    >
        {children}
    </div>
));
Card.displayName = 'Card';

/* ─── Slot math ──────────────────────────────────────────────────── */
// slot 0 = front card (bottom of the visual stack)
// slot i = i-th card back  →  offset UP (negative y) and slightly RIGHT (positive x)
const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,   // negative = up
    z: -i * 60,
    zIndex: total - i,
    scale: 1 - i * 0.03,
});

const placeNow = (el, slot) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        scale: slot.scale,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        opacity: 1,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
    });

/* ─── CardSwap ───────────────────────────────────────────────────── */
const CardSwap = forwardRef(({
    width = 520,
    height = 380,
    cardDistance = 22,    // horizontal px offset per slot
    verticalDistance = 38, // vertical px offset (upward) per slot
    pauseOnHover = true,
    onFrontChange,
    children,
}, ref) => {
    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(
        () => childArr.map(() => React.createRef()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [childArr.length]
    );

    // order[0] = ref-index of the card currently at the FRONT
    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
    const tlRef = useRef(null);
    const intervalRef = useRef(null);
    const container = useRef(null);
    const animating = useRef(false);
    const onFrontChangeRef = useRef(onFrontChange);
    useEffect(() => { onFrontChangeRef.current = onFrontChange; }, [onFrontChange]);

    /* helper — runs a single swap step on the current order */
    const runSwap = useRef(null);

    useEffect(() => {
        const total = refs.length;

        // Place everything immediately, no initial animation
        refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total)));
        onFrontChangeRef.current?.(order.current[0]);

        const swap = () => {
            if (animating.current || order.current.length < 2) return;
            animating.current = true;

            const [front, ...rest] = order.current;
            const elFront = refs[front].current;

            const tl = gsap.timeline({
                onComplete: () => {
                    order.current = [...rest, front];
                    animating.current = false;
                    onFrontChangeRef.current?.(order.current[0]);
                },
            });
            tlRef.current = tl;

            // 1. Fling the front card UP and slightly right (like lifting it off the deck)
            tl.to(elFront, {
                y: '-=320',
                x: '+=80',
                rotation: 6,
                opacity: 0,
                scale: 0.88,
                duration: 0.5,
                ease: 'power2.in',
            });

            // 2. Slide remaining cards forward (into lower slots)
            tl.addLabel('promote', '-=0.22');
            rest.forEach((idx, i) => {
                const el = refs[idx].current;
                const slot = makeSlot(i, cardDistance, verticalDistance, total);
                tl.set(el, { zIndex: slot.zIndex }, 'promote');
                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        scale: slot.scale,
                        duration: 3.2,
                        ease: 'power3.out',
                    },
                    `promote+=${i * 0.03}`
                );
            });

            // 3. Snap old front to back slot (invisible), then slide it in
            const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
            tl.addLabel('return', 'promote+=0.1');
            tl.call(
                () => {
                    gsap.set(elFront, {
                        x: backSlot.x + 60,
                        y: backSlot.y - 80,
                        z: backSlot.z,
                        rotation: -4,
                        scale: backSlot.scale,
                        opacity: 0,
                        zIndex: backSlot.zIndex,
                    });
                },
                undefined,
                'return'
            );
            tl.to(
                elFront,
                {
                    x: backSlot.x,
                    y: backSlot.y,
                    rotation: 0,
                    opacity: 1,
                    duration: 3.5,
                    ease: 'power2.out',
                },
                'return+=0.08'
            );
        };

        runSwap.current = swap;

    }, [cardDistance, verticalDistance]);

    useImperativeHandle(ref, () => ({
        next: () => runSwap.current?.(),
    }));

    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: {
                    width,
                    height,
                    ...(child.props.style ?? {}),
                },
                onClick: (e) => {
                    child.props.onClick?.(e);
                    runSwap.current?.();
                },

                //                 // Bring this card to front
                //                 if (order.current[0] === i) return;
                //                 const pos = order.current.indexOf(i);
                //                 if (pos === -1) return;

                //                 clearInterval(intervalRef.current);
                //                 tlRef.current?.kill();
                //                 animating.current = false;

                //                 // Rotate order so clicked card is front
                //                 order.current = [
                //                     ...order.current.slice(pos),
                //                     ...order.current.slice(0, pos),
                //                 ];

                //                 // Animate everyone into their new slots
                //                 const total = refs.length;
                //                 refs.forEach((r, ri) => {
                //                     const slotIdx = order.current.indexOf(ri);
                //                     const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total);
                //                     gsap.to(r.current, {
                //                         x: slot.x,
                //                         y: slot.y,
                //                         z: slot.z,
                //                         scale: slot.scale,
                //                         rotation: 0,
                //                         opacity: 1,
                //                         zIndex: slot.zIndex,
                //                         duration: 0.5,
                //                         ease: 'power3.out',
                //                     });
                //                 });

                //                 onFrontChangeRef.current?.(order.current[0]);

                //                 // Restart auto-swap
                //                 intervalRef.current = window.setInterval(runSwap.current, delay);
                //             },
            })
            : child
    );

    return (
        <div
            ref={container}
            style={{
                position: 'relative',
                width,
                // Extra height above the card to show the back cards peeking out
                height: height + verticalDistance * (childArr.length - 1) + 20,
                perspective: '900px',
                perspectiveOrigin: 'center bottom',
            }}
        >
            {/* Cards are positioned from the BOTTOM of this container */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width,
                    height,
                }}
            >
                {rendered}
            </div>
        </div>
    );
});

CardSwap.displayName = 'CardSwap';
export default CardSwap;