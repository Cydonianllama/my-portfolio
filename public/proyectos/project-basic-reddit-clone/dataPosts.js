const Posts = [
    {
        idPost : 0,
        idUser : 0,
        typePost : 'title of the post',
        isPromoted : false,
        quantityViews : 0,
        flags : [],
        comunityStats : {
            subcommunityName: '',
            text : '',
            quantityMembers : 0,
            onlne : 0,
            dateCreated : null,
            moderators : [
                {
                    idUser : 0,
                    nameUser : ''
                }
            ],
            selfInfo : {
                isUserJoined : false,
            }
        },
        subredditImageUrl : '',
        postedBy : '',
        userPostedId : 0,
        title : '',
        urlMedia : '',
        linkMedia : '',
        datePost : null,
        dateAgo : '',
        upArrows : 0,
        downArows : 0,
        isGivenAward : false,
        awards : [
            {
                idUser : '',
                type : '',
                quantity : 0
            }
        ],
        commentsIDs : [0,1,2],
        quantityComments : 0,
        isSaved : false,
        isHidden : false,
        report : {
            isReported : false,
            conceptReport : '',
            arguments : ''
        },
    }
]