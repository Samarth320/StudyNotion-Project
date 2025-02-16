const Category = require("../models/Category")      //Category

//create a category handler function
exports.createCategory = async (req,res)=>{        //createCategory
    try{
        //fetch data
        const {name,description} = req.body;

        //validation
        if(!name)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //entry in DB
        const CategorysDetails = await Category.create({     //Category
            name:name,
            description:description
        });
        console.log("category deatils" , CategorysDetails);

        //return res
        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create category",
            error:error.message
        })
    }
}

//showAllCategories handler function
exports.showAllCategories = async(req,res)=>{          //category
    try{
        const allCategorys = await Category.find( {} , {name:true,description:true}); //category     //2nd parameter states that , name and description must be present

        return res.status(200).json({
            success:true,
            message:"All Categorys returned successfully",
            data:allCategorys
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to show allCategorys",
            error:error.message
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
														.populate("courses")
														.exec();

		console.log(selectedCategory);

		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			  return res.status(404).json({
				 success: false, 
				 message: "Category not found" 
				});
		}

		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");

			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.courses;

		// Get courses for other categories
		const differentCategories = await Category.find({
																_id: { $ne: categoryId },          //$ne means not-eaual and eq means equal
															}).populate("courses");

		let differentCourses = [];
		for (const category of differentCategories) {
			differentCourses.push(...category.courses);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};