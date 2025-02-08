package expo.modules.stockfish

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import android.util.Log
import expo.modules.kotlin.Promise


class StockfishModule : Module() {
    private var process: Process? = null
    private var outputStream: OutputStream? = null
    private var reader: BufferedReader? = null
    override fun definition() = ModuleDefinition {
      Name("ExpoSettings")
      AsyncFunction startStockfish() {
          try {
              process = ProcessBuilder("modules/stockfish/android/assets/stockfish-ubuntu-x86-64-avx2").start()
              outputStream = process?.outputStream
              reader = BufferedReader(InputStreamReader(process?.inputStream))

              outputStream?.flush()
          } catch (e: Exception) {
              e.printStackTrace()
          }
      }.runOnQueue(Queues.MAIN)

      AsyncFunction getStockfishOutput(): String {
          try {
              return reader?.readLine() ?: ""
          } catch (e: Exception) {
              e.printStackTrace()
              return ""
          }
      }
      AsyncFunction stopStockfish() {
          try {
              process?.destroy()
          } catch (e: Exception) {
              e.printStackTrace()
          }
      }
    }
}
