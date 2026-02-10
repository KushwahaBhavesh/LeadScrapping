"use client"

import { motion } from "framer-motion"
import React from "react"

export function Marquee({ children, reverse = false, duration = 20 }: { children: React.ReactNode, reverse?: boolean, duration?: number }) {
    return (
        <div className="flex overflow-hidden group select-none">
            <motion.div
                initial={{ x: reverse ? "-100%" : 0 }}
                animate={{ x: reverse ? 0 : "-100%" }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-none gap-20 py-4 items-center"
            >
                {children}
            </motion.div>
            <motion.div
                initial={{ x: reverse ? "-100%" : 0 }}
                animate={{ x: reverse ? 0 : "-100%" }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-none gap-20 py-4 items-center"
            >
                {children}
            </motion.div>
        </div>
    )
}
