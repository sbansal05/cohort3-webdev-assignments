let bookmarks = []; // in memory space
let currId = 1;

export async function addBookmark(req,res,next){
    try {
        const {category, url} = req.body;
        if(!category || !url) {
            return res.status(400).json({error: 'Category and Url required'});
        }

        const newBookmark = {id: currId++ , category, url};
        bookmarks.push(newBookmark);
        return res.status(200).json({newBookamrk});
    } catch(error) {
        res.status(500).json({message: 'An error occurred while adding bookmark'});

    }


}

export async function deleteBookmark(req,res,next){
    try {
        const {id} = req.params;
        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id);
        if(!bookmarkIndex) {
            res.status(404).json({error: "bookmark not found"});
        }
        bookmarks.splice(bookmarkIndex, 1);
        res.status(200).json({message: "Bookmark deleted"});

    } catch {
        res.status(500).json({error: "An error occured while deleting the bookmark"});
    }
    



}

export async function getAllBookmarks(req,res,next){
    res.json(bookmarks);

}
