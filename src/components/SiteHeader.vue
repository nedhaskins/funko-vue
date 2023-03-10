<script setup>
	//Foundational imports
	import { onMounted, computed } from 'vue';
	import { RouterLink, useRoute, useRouter } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';

	//Firebase imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
	import { useUserService } from '@/services/UserService';

	//File imports
	import UserIcon from '@/components/icons/UserIcon.vue';
	import CartIcon from '@/components/icons/CartIcon.vue';
	import CheeseburgerIcon from '@/components/icons/CheeseburgerIcon.vue';

	import { useCartService } from '@/services/CartService';
	const cart = useCartService();

	//Router and interface variables
	const route = useRoute();
	const router = useRouter();
	const ui = useInterfaceStore();

	//Firebase variables

	const user = useUserService();
	const db = useFirestore();
	const categories = useCollection(collection(db, 'categories'));
	const userCollection = useCollection(collection(db, 'users'));

	// const isOpen = ref(false); //this would be a component of a UI store maybe?

	// // set up a "listener" that will
	// // listen for "clicks" (and taps) on the whole page!
	// spaceBox.addEventListener('click', function (event) {
	// 	console.log(event.target);
	// 	if (event.target.matches('.toggle')) {
	// 		body.classList.toggle('small-menu-open');
	// 	}
	// 	//need some logic in here to close the menu
	// 	// if (event.target.matches('.site-menu a')) {
	// 	// 	body.classList.remove('small-menu-open');
	// 	// }
	// });

	function toggleMobileMenu() {
		let body = document.querySelector('body');
		body.classList.toggle('small-menu-open');
	}

	function checkMobileMenu() {
		let body = document.querySelector('body');
		if (body.classList == 'small-menu-open') {
			body.classList.remove('small-menu-open');
		} else {
			return;
		}
	}
</script>
<template>
	<!-- 	<div v-if="user.current">Signed in as: {{ user.current.email }}</div>
	<pre v-if="user.current">Signed in as: {{ user.userDoc }}</pre> -->
	<!-- <div v-for="item in cart">{{ item }}</div> -->
	<!-- <div v-for="item in cart.cartGrouping">{{ item }}</div> -->

	<header :class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<header-top>
				<space-box @click="toggleMobileMenu()" class="left">
					<svg-wrapper class="cheeseburger">
						<CheeseburgerIcon class="toggle" />
					</svg-wrapper>
				</space-box>
				<title-wrapper>
					<h1 class="site-title normal-voice">Funko Pop East Coast</h1>
				</title-wrapper>
				<space-box class="right">
					<div v-if="user.current" class="user-prompts">
						<span id="result">Hi, {{ user.userDoc?.firstName }}</span>
						<button class="logout" @click="user.signOut()">Logout</button>
					</div>
					<svg-wrapper v-if="!user.current" class="user-icon">
						<RouterLink to="/signin-page">
							<UserIcon />
						</RouterLink>
					</svg-wrapper>

					<svg-wrapper class="cart">
						<RouterLink to="/shopping-cart">
							<div class="cart-count">
								<p v-if="user.current">{{ cart.totalItems }}</p>
								<p v-else>0</p>
							</div>
							<!--Show the current cart object attached to the current user.  If the user is logged out(if there is no current user) do not show any Firebase cart data.-->
							<CartIcon />
						</RouterLink>
					</svg-wrapper>
				</space-box>
			</header-top>

			<menu-wrapper>
				<!-- {{ ui.menuClass }}  -->

				<nav class="site-menu header">
					<RouterLink @click="checkMobileMenu()" to="/home">Home</RouterLink>

					<RouterLink @click="checkMobileMenu()" to="/figures">Figures</RouterLink>
					<RouterLink @click="checkMobileMenu()" to="/categories">Categories</RouterLink>
					<RouterLink @click="checkMobileMenu()" v-if="user.current && user.role === 'admin'" to="/admin"
						>Dashboard</RouterLink
					>

					<button @click="toggleMobileMenu()" class="toggle small-screen">Close</button>
				</nav>
			</menu-wrapper>
		</inner-column>
	</header>
</template>

<style lang="scss" scoped>
	/*	*:focus {
	 outline: 20px solid black;}*/

	menu-wrapper {
		display: flex;
		justify-content: space-evenly;
	}
	.site-menu.header {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;

		font-family: 'Bangers';
		a {
			padding: 0.8em 0.8em 0 0.8em;
			font-size: 32px;
		}

		.router-link-active {
			font-weight: 700;
			color: var(--vividMulberry);
		}
	}

	inner-column {
		display: flex;
		flex-direction: column;
	}

	header-top {
		display: flex;
		flex-direction: row;
		justify-content: stretch;
	}

	title-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 3;
	}

	.site-title {
		font-size: calc(26px + 0.7vw);
	}

	space-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
	}

	svg-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	button {
		border: 0px;
		background-color: none;
	}

	.user-icon {
		width: 44px;
		margin-left: 11px;
	}

	@media (min-width: 600px) {
		space-box.right {
			flex-direction: row;
			justify-content: space-evenly;
		}

		.user-icon {
			margin-left: 0px;
		}

		svg-wrapper.cheeseburger,
		button.toggle.small-screen {
			display: none;
		}

		.site-title {
			font-size: calc(36px + 0.7vw);
		}
	}
	@media (max-width: 729px) {
		title-wrapper {
			max-width: 265px;
		}
	}
	.cart {
		position: relative;
		width: 51px;
	}

	.cart-count {
		background-color: var(--cherokee);
		position: absolute;
		top: -9px;
		right: -8px;
		border: 2px solid black;
		padding: 4px;
		border-radius: 50%;

		p {
			font-family: 'Fredoka One';
			letter-spacing: 0.1em;
			font-size: 17px;
			margin-left: 2px;
		}
	}

	@media (prefers-color-scheme: dark) {
		.cart-count {
			color: var(--ink);
		}
	}

	@media (max-width: 599px) {
		/* only if small! */
		.site-menu.header {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			/* */
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* */
			opacity: 0;
			background-color: gray;
			pointer-events: none;
			transform: translate(-100%, 0); /* another fun option to try #a */
			transform: scale(0.5);
			/* */
			transition: 0s;
		}
		.site-menu.header a {
			min-width: 200px;
			text-align: center;
		}

		button.toggle.small-screen {
			border: 3px solid white;
			background-color: black;
			color: white;
			font-family: 'Bangers';
			font-size: 32px;
			padding: 16px;
			margin-top: 20px;
		}

		button.toggle.small-screen:hover {
			border: 3px solid black;
			background-color: var(--paper);
			color: var(--ink);
			font-family: 'Bangers';
			font-size: 32px;
			padding: 16px;
		}
	}

	.user-prompts {
		// border: 3px dashed red;

		span {
			font-family: 'Bangers';
			color: gray;
			display: block;
			font-size: 23px;
			text-align: center;
		}

		.logout {
			margin-top: 6px;
			padding: 6px;
			border: 2px solid var(--ink);
		}
	}
</style>
