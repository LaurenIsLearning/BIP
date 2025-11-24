//modal creation placeholder
import React from "react";
import styles from "../style/Modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return(
        <section className={styles.overlay} role="dialog" aria-modal="true">
            <article className={styles.modal}>
                <header className={styles.header}>
                    <button className={styles.closeButton} onClick={onClose} area-label="Close modal">
                        x
                    </button>
                </header>
                <main className={styles.content}>
                    {children}
                </main>
            </article>
        </section>
    );
}