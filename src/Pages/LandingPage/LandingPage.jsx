import React from 'react'
import { Link } from 'react-router-dom'
import social from "../../Assets/Images/social.jpg"

export const LandingPage = () => {
  return (
	<div class="bg-black text-white py-20 h-screen">
		<div class="container mx-auto flex md:flex-row items-center my-12 md:my-24">
			<div class="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
				<h1 class="text-[2.3rem] font-extrabold ml-[-.5rem] md:text-5xl p-2 text-[#019db1] tracking-loose">Gravity Mates</h1>
				<h2 class="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">The Timeless Infinity
				</h2>
				<p class="text-sm md:text-base text-gray-50 mb-4">A Social App which allows users, who can sign-up for free profiles, to connect with friends, families, work colleagues or people they don’t know, online</p>
                <Link to={"/login"}><button
					class="bg-transparent hover:bg-[#019db1] text-[#019db1] hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-[#019db1] hover:border-transparent">
					Login
                    </button></Link>
			</div>
			<div class="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
				<div class="h-48 flex flex-wrap content-center">
						<div>
							<img class=" w-[28rem] mt-24 md:mt-0 p-8 md:p-0 h-fit"  src={social}/></div>
							</div>
						</div>
					</div>
				</div>

  )
}
