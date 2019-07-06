const stationInfo = {
    "success": true,
    "message": "Station Fetched Successfully",
    "flag": 1,
    "data": {
        "_id": "5c0243d83587203e2cf01e6f",
        "station_name": "Bhayander",
        "no_of_platforms": 4,
        "bridges": [{
                "connected_platform": [
                    2,
                    3,
                    4
                ],
                "bridge_status": "working",
                "_id": "5c0243d83587203e2cf01e72",
                "bridge_id": 9465,
                "bridge_name": "B1",
                "constructed_year": "2017",
                "capacity": 200,
                "threshold_limit": 240,
                "upper_threshold_limit": 270
            },
            {
                "connected_platform": [
                    1,
                    2,
                    3,
                    4
                ],
                "bridge_status": "working",
                "_id": "5c0243d83587203e2cf01e71",
                "bridge_id": 6667,
                "bridge_name": "B2",
                "constructed_year": "2003",
                "capacity": 230,
                "threshold_limit": 270,
                "upper_threshold_limit": 300
            },
            {
                "connected_platform": [
                    2,
                    3,
                    4
                ],
                "bridge_status": "working",
                "_id": "5c0243d83587203e2cf01e70",
                "bridge_id": 1004,
                "bridge_name": "B3",
                "constructed_year": "1998",
                "capacity": 100,
                "threshold_limit": 120,
                "upper_threshold_limit": 140
            }
        ],
        "__v": 0
    }
};

lagGayeHai(stationInfo, "B3", []);

function lagGayeHai (stationInfo, mishapBridge, currentBridgeStatus){
    for (const bridgeInfo of stationInfo.data.bridges){
        if(bridgeInfo.bridge_name === mishapBridge){
            for(const platformNo of bridgeInfo.connected_platform){
                for(const result of stationInfo.data.bridges){
                    for(const ans of result.connected_platform){
                        if(ans === platformNo){
                            console.log(platformNo + " --- " + result.bridge_name);
                        }
                    }
                }
            }
        }
    }
}