"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
	{
		title: "Pike Place Morning",
		date: "June 12, 2025",
		text: `We arrived in Seattle at dawn, greeted by the hum of vendors at Pike Place Market. Booths of fresh flowers and local produce glistened with morning dew. I sipped hot coffee while watching fish tossers perform above the bustling crowd.`,
		imageUrl: "https://images.unsplash.com/photo-1754770584877-73ba9341671c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Space Needle Ascent",
		date: "June 12, 2025",
		text: `Next, we rode the glass elevator to the top of the Space Needle. The city unfurled below us—skyscrapers, ferries, and distant mountains. A gentle breeze reminded us of Puget Sound’s cool embrace.`,
		imageUrl: "https://images.unsplash.com/photo-1526442698070-bbe142c3531d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Chihuly Glass Garden",
		date: "June 13, 2025",
		text: `In the afternoon, we wandered through Chihuly Garden and Glass, marveling at vibrant glass sculptures that danced with light. Each piece felt like a colorful dream brought to life. Our favorite was the swirling Blue Icicle Tower by the courtyard.`,
		imageUrl: "https://images.unsplash.com/photo-1676918945892-50c4a77d7da3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Elliott Bay Ferry",
		date: "June 13, 2025",
		text: `That evening, we boarded a ferry across Elliott Bay to Bainbridge Island. The skyline glowed behind us as seals surfaced near the boat. We shared a picnic on the deck, the city lights twinkling like distant stars.`,
		imageUrl: "https://images.unsplash.com/photo-1658086180790-25665c560b54?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Kerry Park Sunset",
		date: "June 14, 2025",
		text: `On our final day, we headed to Kerry Park for a sunset view of the city. The golden light painted the skyline pink and orange. Seattle bade us farewell with its iconic silhouette against a fiery sky.`,
		imageUrl: "https://images.unsplash.com/photo-1716616372378-768a13ad517e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export default function Home() {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const index = Math.floor(
				(window.scrollY + window.innerHeight / 2) / window.innerHeight
			);
			setActive(Math.min(Math.max(index, 0), sections.length - 1));
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const variants = {
		enter: { opacity: 0, y: 50, filter: "blur(10px)" },
		center: { opacity: 1, y: 0, filter: "blur(0px)" },
		exit: { opacity: 0, y: -50, filter: "blur(10px)" },
	};

	return (
		<div className="relative">
			{/* dots indicator */}
			<div className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
				{sections.map((_, idx) => (
					<span
						key={idx}
						onClick={() =>
							window.scrollTo({ top: idx * window.innerHeight, behavior: "auto" })
						}
						className={`block w-2 h-2 rounded-full cursor-pointer transform transition-all duration-300 ease-in-out ${
							idx === active ? "bg-black scale-125" : "bg-gray-300 scale-100"
						} hover:scale-125`}
					/>
				))}
			</div>
			<div style={{ height: `${sections.length * 100}vh` }}>
				<AnimatePresence mode="wait">
					<motion.div
						key={active}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.8 }}
						className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl px-1 text-left"
					>
						<h2 className="text-sm font-bold mb-2">
							{sections[active].title}
						</h2>
						<span className="text-xs text-gray-500 mb-4 block">
							{sections[active].date}
						</span>
						<p className="text-sm leading-relaxed text-left">
							{sections[active].text}
						</p>
						<motion.img
							src={sections[active].imageUrl}
							alt={`Section ${active + 1} image`}
							className="mt-6 mx-auto rounded-lg"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: 'spring', stiffness: 200, damping: 12, mass: 0.8, delay: 0.1 }}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
