<!--This form adds records that have a product's name, description, photo,
and will also create a unique ID for every entry.

The entries will be stored in the figure data store, universally available
to every page.-->

<script setup>
	import { reactive } from 'vue';

	import { v4 as uuidv4 } from 'uuid';

	import { useRoute } from 'vue-router';
	import { useFigureDataStore } from '@/stores/figureData';

	const route = useRoute();
	const figures = useFigureDataStore();

	const values = reactive({
		items: [],
		item: {
			name: '',
			price: '',
		},
		amount: '',
		total: '',
		itemRow: '',
		output: '',
	});

	// function add() {
	// 	const item = {
	// 		name: values.item.name,
	// 		slug: values.item.slug,
	// 		image: values.item.image,
	// 		price: values.item.price,
	// 		description: values.item.description,
	// 	};
	// 	values.items = [...values.items, item];
	// 	//this can be written in one line using map?
	// 	clearForm();
	// }

	//grabbing the add() function from the store file
	function createRecord() {
		const record = {
			id: uuidv4(),
			name: values.item.name,
			slug: values.item.slug,
			image: values.item.image,
			price: values.item.price,
			description: values.item.description,
		};
		// console.log(record);

		figures.list.push(record);
		console.log(figures.list);
		clearForm();
	}

	function clearForm() {
		values.item.name = '';
		values.item.slug = '';
		values.item.image = '';
		values.item.price = '';
		values.item.description = '';
	}
</script>

<template>
	<h1>Create Store Record</h1>

	<!--Need to put some drop-down option menus in here-->

	<div class="record-form">
		<form>
			<input-wrapper>
				<label for="name">Name</label>
				<input id="name" type="text" v-model="values.item.name" />
			</input-wrapper>
			<input-wrapper>
				<label for="slug">Slug</label>
				<input id="slug" type="text" v-model="values.item.slug" />
			</input-wrapper>
			<input-wrapper>
				<label for="image">Image</label>
				<input id="image" type="text" v-model="values.item.image" />
			</input-wrapper>
			<input-wrapper>
				<label for="price">Price</label>
				<input id="price" type="number" v-model="values.item.price" />
			</input-wrapper>
			<input-wrapper>
				<label for="description">Description</label>
				<input id="description" type="text" v-model="values.item.description" />
			</input-wrapper>

			<button-wrapper>
				<button @click.prevent="createRecord">Create record</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style scoped>
	button-wrapper {
		display: flex;
		gap: 20px;
		margin-top: 20px;
	}

	.record-form {
		padding: 20px;
		margin-top: 40px;
	}

	input-wrapper {
		display: flex;
		margin-top: 20px;
		gap: 20px;
	}

	label {
		display: block;
	}

	input,
	label {
		font-size: 24px;
	}

	tr {
		display: flex;
	}

	td {
		font-family: 'Lucida Grande';
		font-size: 14px;
		flex: 1;
		border: 1px solid white;
		background-color: #6f2203;
		padding: 20px;
	}

	/* TYPOGRAPHY */

	h1 {
		font-size: 48px;
		font-weight: 700;
		margin-top: 30px;
		color: white;
	}

	/*SCAFFOLDING*/

	* {
		border: 1px dashed white;
	}
</style>