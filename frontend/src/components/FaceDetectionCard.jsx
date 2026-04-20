import { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "./ui/button";
import { ScanFaceIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { MusicButton } from "./ui/skiper-ui/skiper25";
import instance from "@/axios/base";
import { useMusicContext } from "@/context/MusicContext";
import SkeletonTable from "./ui/skeleton";

export default function FaceDetectionCard() {
      const videoRef = useRef(null);
      const [expression, setExpression] = useState("");
      const [musics, setMusics] = useState([]);
      const { stopCurrentMusic } = useMusicContext();

      const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      };

      const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: false,
            });
            if (videoRef.current) {
                  videoRef.current.srcObject = stream;
                  await videoRef.current.play();
            }
      };

      const runDetection = async () => {
            setMusics([]);
            await startCamera();
            if (!videoRef.current) return;
            const result = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            if (result?.expressions) {
                  const entries = Object.entries(result.expressions);
                  const top = entries.sort((a, b) => b[1] - a[1])[0];
                  setExpression(top[0]);
            }
      };

      const init = useCallback(async () => {
            await loadModels();
            instance
                  .get(`get-music?mood=${expression}`)
                  .then((res) => {
                        setMusics(res.data.data);
                  })
                  .catch((error) => {
                        console.log(error.message);
                  });
      }, [expression]);
      useEffect(() => {
            init();
      }, [init]);

      useEffect(() => {
            stopCurrentMusic();
      }, [expression, stopCurrentMusic]);

      return (
            <div className="flex justify-center flex-col md:flex-row w-full h-full items-center gap-5">
                  <Card className="relative w-full h-full max-w-sm pt-0">
                        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                        {videoRef && <video className="relative z-20 aspect-video w-full object-cover" ref={videoRef} autoPlay muted playsInline />}
                        <CardHeader>
                              <CardAction>{expression && <Badge className="bg-sky-50 uppercase font-semibold text-sky-800 text-xl dark:bg-sky-950 dark:text-sky-300">{expression && expression}</Badge>}</CardAction>
                              <CardTitle className={"font-semibold"}>{expression ? "Your Expressions" : "Press the button to check you expression"}</CardTitle>
                        </CardHeader>
                        <CardFooter className={" flex justify-center items-center"}>
                              <div onClick={runDetection}>
                                    <Button variant="default" size="lg">
                                          <ScanFaceIcon />
                                          Detect Mode
                                    </Button>
                              </div>
                        </CardFooter>
                  </Card>
                  {musics.length > 0 ? <TableUsersDemo musics={musics} /> : expression && <SkeletonTable />}
            </div>
      );
}

export function TableUsersDemo({ musics }) {
      return (
            <div className="bg-background w-full md:w-fit h-1/2 ">
                  <Table className="w-full max-w-3xl overflow-hidden">
                        <TableHeader>
                              <TableRow>
                                    <TableHead>
                                          <Badge variant="secondary" className={"text-xl py-3"}>
                                                Music Name
                                          </Badge>
                                    </TableHead>
                                    <TableHead>
                                          <Badge variant="secondary" className={"text-xl py-3"}>
                                                Play/Pause
                                          </Badge>
                                    </TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {musics?.map((music, i) => (
                                    <TableRow key={music._id} index={i}>
                                          <TableCell className="font-[inherit] text-[1.15rem]">{music.title}</TableCell>
                                          <TableCell>
                                                <MusicButton music={music.audio_url} />
                                          </TableCell>
                                    </TableRow>
                              ))}
                        </TableBody>
                  </Table>
            </div>
      );
}
